import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { parse } from 'csv-parse/sync'

export const metadata: Metadata = {
  title: 'Sites List | Free For Charity Admin',
  description: 'Master list of all sites with server, Cloudflare, and pairing status.',
}

interface SiteData {
  section: string
  domain: string
  status: string
  inWhmcs: string
  inCloudflare: string
  inWpmudev: string
  serverInUse: string
  oldServerAbandoned: string
  notes: string
  cloudflareIp: string
  repoUrl: string
  priority: string
}

async function getSitesData(): Promise<SiteData[]> {
  const filePath = path.join(process.cwd(), 'docs', 'sites_list.csv')
  const fileContent = fs.readFileSync(filePath, 'utf8')

  /* 
    Headers expected from update-sites-data.mjs:
    Section, Domain, Status, In WHMCS, In Cloudflare, In WPMUDEV, 
    Server In Use, Old Server Abandoned?, Notes, 
    Cloudflare IP, Is In Cloudflare, Repo URL, Priority
  */

  const records = parse(fileContent, {
    columns: false,
    skip_empty_lines: true,
    from_line: 2 // Skip header
  })

  return records.map((columns: string[]) => {
    return {
      section: columns[0]?.trim() || '',
      domain: columns[1]?.trim() || '',
      status: columns[2]?.trim() || '',
      inWhmcs: columns[3]?.trim() || '',
      inCloudflare: columns[4]?.trim() || '',
      inWpmudev: columns[5]?.trim() || '',
      serverInUse: columns[6]?.trim() || '',
      oldServerAbandoned: columns[7]?.trim() || '',
      notes: columns[8]?.trim() || '',
      cloudflareIp: columns[9]?.trim() || '',
      // col 10 is 'Is In Cloudflare' (redundant)
      repoUrl: columns[11]?.trim() || '',
      priority: columns[12]?.trim() || 'Standard',
    }
  })
}

function PriorityLegend() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-xl font-bold text-ffc-teal-dark mb-4">Priority Sections Legend</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
          <span className="font-bold block text-purple-900">For-Profit</span>
          <p className="text-sm text-purple-700">
            Highest Priority. Commercial/Business domains (.com, .net, etc.).
          </p>
        </div>
        <div className="p-3 border-l-4 border-green-500 bg-green-50">
          <span className="font-bold block text-green-900">Org-WPAdmin</span>
          <p className="text-sm text-green-700">
            High Priority. Verified WordPress Admin access (Hostinger).
          </p>
        </div>
        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
          <span className="font-bold block text-yellow-900">Org-NoWP</span>
          <p className="text-sm text-yellow-700">
            Medium Priority. No verified WP Admin access (Hostinger).
          </p>
        </div>
        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
          <span className="font-bold block text-blue-900">InterServer-Org</span>
          <p className="text-sm text-blue-700">Nonprofit organizations hosted on InterServer.</p>
        </div>
        <div className="p-3 border-l-4 border-gray-500 bg-gray-50">
          <span className="font-bold block text-gray-900">Subdomain</span>
          <p className="text-sm text-gray-700">Lowest Priority. Subdomains and staging sites.</p>
        </div>
        <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
          <span className="font-bold block text-orange-900">Cloudflare-Only</span>
          <p className="text-sm text-orange-700">
            Domains in Cloudflare but not on any known hosting server list.
          </p>
        </div>
        <div className="p-3 border-l-4 border-indigo-500 bg-indigo-50">
          <span className="font-bold block text-indigo-900">Krystal-New</span>
          <p className="text-sm text-indigo-700">
            Sites identified on the new Krystal.io hosting account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default async function SitesListPage() {
  const sites = await getSitesData()

  // Filter for "Good" sites: Apex domain + In Cloudflare + On GitHub Pages
  const migratedSites = sites.filter((site) => {
    const isApex = site.domain.split('.').length === 2
    const inCloudflare = site.inCloudflare.toLowerCase() === 'yes'
    const onGithub = site.serverInUse.toLowerCase() === 'github pages'
    return isApex && inCloudflare && onGithub
  })

  // Helper to color code statuses
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'yes') return 'bg-green-100 text-green-800'
    if (s === 'no') return 'bg-gray-100 text-gray-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getAbandonColor = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'yes') return 'text-red-600 font-bold'
    return 'text-gray-500'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ffc-teal-dark mb-4">Sites Master List</h1>
        <p className="text-gray-600">
          Authoritative list of all domains, server assignments, and migration status.
        </p>
      </div>

      {/* Migrated / Good Sites Table */}
      <div className="bg-green-50 rounded-lg shadow-md mb-10 overflow-hidden border border-green-200">
        <div className="px-6 py-4 border-b border-green-200 bg-green-100">
          <h2 className="text-xl font-bold text-green-800 flex items-center">
            <span className="mr-2">✅</span> Migrated Sites (Live)
          </h2>
          <p className="text-green-700 text-sm mt-1">
            These sites are fully migrated: Apex domain + Cloudflare + GitHub Pages.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Repo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  WHMCS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                  Cloudflare
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {migratedSites.length > 0 ? (
                migratedSites.map((site, index) => (
                  <tr key={index} className="hover:bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900 font-bold hover:underline">
                      <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                        {site.domain}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(site.status === 'Active' ? 'Yes' : 'No')}`}>
                        {site.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {site.repoUrl ? (
                        <a
                          href={site.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                        >
                          Repo
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {site.inWhmcs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {site.inCloudflare}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
                    No fully migrated sites found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PriorityLegend />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-ffc-teal-lightest">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Section
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Domain
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  WHMCS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Cloudflare
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  WPMUDEV
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Server
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-ffc-teal-dark uppercase tracking-wider"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sites.map((site, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'bg-white hover:bg-ffc-teal-lightest/50'
                      : 'bg-gray-50 hover:bg-ffc-teal-lightest/50'
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-700">
                    {site.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ffc-teal font-medium hover:underline">
                    <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer">
                      {site.domain}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
                    {site.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(site.inWhmcs)}`}
                    >
                      {site.inWhmcs}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(site.inCloudflare)}`}
                    >
                      {site.inCloudflare}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(site.inWpmudev)}`}
                    >
                      {site.inWpmudev}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {site.serverInUse}
                  </td>
                  <td
                    className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate"
                    title={site.notes}
                  >
                    {site.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Total Sites: <span className="font-medium">{sites.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
