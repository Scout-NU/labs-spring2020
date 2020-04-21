import { IEntry, isEntry, isLink, JsonObject, Resolved, ILink, ContentfulIncludedLinks, IAsset } from './base';
import { isArray } from 'util';

/**
 * Returns a boolean indicating whether the given entry is resolved to a certain
 * depth.  Typescript can understand the result of this within an if or switch
 * statement.
 *
 * @param entry The entry whose fields should be checked for links
 * @param depth how far down the tree to expect that the entry was resolved.
 * @returns a boolean indicating that the entry is a Resolved entry.
 */
export function isResolved<TProps extends JsonObject>(
  entry: IEntry<TProps>,
  depth: number = 1,
): entry is Resolved<IEntry<TProps>> {
  if (depth < 1) { throw new Error(`Depth cannot be less than 1 (was ${depth})`) }

  return Object.keys(entry.fields).every((field) => {
    const val = entry.fields[field]

    if (Array.isArray(val)) {
      return val.every(check)
    } else {
      return check(val)
    }
  })

  function check(val: any): boolean {
    if (isLink(val)) {
      return false
    }
    if (depth > 1 && isEntry(val)) {
      return isResolved(val, depth - 1)
    }
    return true
  }
}

/**
 * Expects that an entry has been resolved to at least a depth of 1,
 * throwing an error if not.
 *
 * @param entry The entry whose fields should be checked for links
 * @returns the same entry object, declaring it as resolved.
 */
export function expectResolved<TProps extends JsonObject>(
  entry: IEntry<TProps>,
  depth: number = 1,
): Resolved<IEntry<TProps>> {
  if (isResolved(entry, depth)) {
    return entry
  }
  throw new Error(`${entry.sys.contentType.sys.id} ${entry.sys.id} was not fully resolved`)
}

/**
 * Recursively resolves an Entry, based on the provided links. 
 * @param entry The entry to resolve.
 * @param links The links containing the Assets and Entries in the includes response of a Contentful API call. If something is not present,
 * an error will be thrown. If this is the case, it's likely that the includes argument did not include the correct depth. See the Contenful API
 * documentation for more details on this.
 */
export function resolveEntry<EntryType extends IEntry<any>>(entry: EntryType, links: ContentfulIncludedLinks, ignoreMissingLinks: boolean = false): EntryType {
  let fieldKeys = Object.keys(entry.fields);
  let resolvedEntry = Object.assign({}, entry);

  fieldKeys.forEach(key => resolvedEntry.fields[key] = resolveValue(entry.fields[key], links, ignoreMissingLinks));

  return resolvedEntry;
}

function resolveValue(item: any, links: ContentfulIncludedLinks, ignoreMissingLinks: boolean): any {
    if (isEntry(item)) return resolveEntry(item, links);
    else if (isLink(item)) {
        try {
            return resolveLink(item, links);
        } 
        catch(e) {
          /* 
            TODO: This is super annoying. 
            For some reason, if you query for a given content type, and that content type has related content of the same type,
            and that linked content is present in the returned values for the search, that content is NOT put in the includes array (resolved links).
            This means that this function will not be able to find it. This breaks search. Putting this workaround for functions that need to do that.
          */
          if (ignoreMissingLinks) return undefined;
          throw new Error(e);
        }
      }
    else if (Array.isArray(item)) return resolveArray(item, links, ignoreMissingLinks);  
    return item;
} 

function resolveArray(items: any[], links: ContentfulIncludedLinks, ignoreMissingLinks: boolean): any[] {
    return items.map(v => resolveValue(v, links, ignoreMissingLinks));
}

/**
 * Finds a Link's value in the provided array of values. If it is an Entity, it resolved the Links within that entity before returning it.
 * @param link The Link to resolve.
 * @param links The links containing the Assets and Entries in the includes response of a Contentful API call. If something is not present,
 * an error will be thrown. If this is the case, it's likely that the includes argument did not include the correct depth. See the Contenful API
 * documentation for more details on this.
 */
function resolveLink(link: ILink<string>, links: ContentfulIncludedLinks): IEntry<any> | IAsset {
  var resolved: IEntry<any> | IAsset | undefined;
  let type = link.sys.linkType;
  switch(type) {
      case 'Asset':
          resolved = links.Asset.find(e => e.sys.id === link.sys.id);
          break;
      case 'Entry':
          resolved = links.Entry.find(e => e.sys.id === link.sys.id);
          break;
      default:
          throw Error(`Invalid link type. Cannot resolve Link of Type ${type}`);
      }
  
  if (!resolved) throw Error("Entry was not present in provided links. Check the depth at which content was fetched.");
  if (isEntry(resolved)) return resolveEntry(resolved, links);
  return resolved;
}