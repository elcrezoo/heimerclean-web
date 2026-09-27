import { siCrunchbase, siEuropeanunion, siProducthunt } from 'simple-icons'
import { company } from './social'

export interface Listing {
  id: string
  name: string
  blurb: string
  url: string
  color: string
  /** simple-icons path; platforms without one render a wordmark tile */
  icon?: string
  mark?: string
}

/** Startup directories. The F6S URL is unconfirmed — replace it with the real profile link. */
export const listings: Listing[] = [
  {
    id: 'startuplist',
    name: 'StartupList',
    blurb: 'Featured startup profile',
    url: 'https://startuplist.com.tr/startup/heimerclean-ai',
    color: '#ff5a1f',
    mark: 'SL',
  },
  {
    id: 'f6s',
    name: 'F6S',
    blurb: 'Company & founder profile',
    url: 'https://www.f6s.com/company/heimerclean',
    color: '#e8174b',
    mark: 'f6s',
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase',
    blurb: 'HeimerClean AI Silent Optimization',
    url: 'https://www.crunchbase.com/organization/heimerclean-ai-silent-optimization',
    color: `#${siCrunchbase.hex}`,
    icon: siCrunchbase.path,
  },
  {
    id: 'producthunt',
    name: 'Product Hunt',
    blurb: 'Launch page & upvotes',
    url: company.productHuntUrl,
    color: `#${siProducthunt.hex}`,
    icon: siProducthunt.path,
  },
]

export interface PressItem {
  date: string
  source: string
  title: string
  body: string
  url: string
  kind: 'Award' | 'Program' | 'Feature' | 'Evaluation'
  icon?: string
  color: string
}

export const press: PressItem[] = [
  {
    date: 'Sep 2026',
    source: 'TÜBİTAK',
    kind: 'Evaluation',
    title: '8.0 in all three second-stage categories',
    body: 'Technological innovation, team & business plan, and commercialization potential — backed by a validated MVP and a 108-person user study.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7504518895064686594',
    color: '#e30a17',
  },
  {
    date: 'Aug 2026',
    source: 'BTM',
    kind: 'Program',
    title: 'Accepted into the BTM Pre-Incubation Program',
    body: 'Another milestone on the road from validated product to scalable B2B endpoint optimization.',
    url: 'https://www.linkedin.com/posts/heimerclean_activity-7496645205232820224-7XHu',
    color: '#ba00ff',
  },
  {
    date: 'May 2026',
    source: 'European Commission',
    kind: 'Award',
    title: 'Seal of Excellence under Horizon Europe',
    body: '“Adaptive Intelligence for Self-Optimizing System Performance” was rated a high-quality proposal by independent experts.',
    url: 'https://www.linkedin.com/posts/heimerclean_seal-of-excellence-activity-7457704577866489856-HOtk',
    icon: siEuropeanunion.path,
    color: `#${siEuropeanunion.hex}`,
  },
  {
    date: '2026',
    source: 'StartupList',
    kind: 'Feature',
    title: 'HeimerClean Ai — local AI that optimizes slowing Windows PCs',
    body: 'A profile of the AI System Agent and the founder’s decade of software work on privacy-first, energy-efficient optimization.',
    url: 'https://startuplist.com.tr/startup/heimerclean-ai',
    color: '#ff5a1f',
  },
]

export const recognitions = [
  { label: 'EU Seal of Excellence', icon: siEuropeanunion.path },
  { label: 'TÜBİTAK 8.0 in every category' },
  { label: 'BTM Pre-Incubation' },
]
