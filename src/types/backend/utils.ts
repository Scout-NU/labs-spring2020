import { IEntry, isEntry, isLink, JsonObject, Resolved, ILink, ContentfulIncludedLinks, IAsset } from './base';

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
export function resolveEntry<EntryType extends IEntry<any>>(entry: EntryType, links: ContentfulIncludedLinks): EntryType {
  let fieldKeys = Object.keys(entry.fields);
  let resolvedEntry = Object.assign({}, entry);

  fieldKeys.forEach(key => {
      let value = entry.fields[key];
      
      if (isLink(value)) resolvedEntry.fields[key] = resolveLink(value, links);
      
      else if (Array.isArray(value)) {
          let resolvedList = value.map(v => {
              if (isEntry(v)) return resolveEntry(v, links);
              if (isLink(v)) return resolveLink(v, links);
              return v;
          });
          resolvedEntry.fields[key] = resolvedList;
      } 
      
      else resolvedEntry.fields[key] = value;
  });

  return resolvedEntry;
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