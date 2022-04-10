/* eslint-disable react/jsx-key */
import Head from 'next/head'
import { Fragment, useState, useMemo } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { useTable } from 'react-table/dist/react-table.development'

const filters = [
  {
    id: 'ai',
    name: 'AI',
    options: [
      { value: 'artificial intelligence', label: 'Artificial Intelligence', checked: true },
      { value: 'computer vision', label: 'Computer Vision', checked: true },
      { value: 'machine learning & data mining', label: 'Machine Learning & Data Mining', checked: true },
      { value: 'natural language processing', label: 'Natural Language Processing', checked: true },
      { value: 'the web & information retrieval', label: 'The Web & Information Retrieval', checked: true },
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    options: [
      { value: 'computer architecture', label: 'Computer Architecture', checked: true },
      { value: 'computer networks', label: 'Computer Networks', checked: true },
      { value: 'computer security', label: 'Computer Security', checked: true },
      { value: 'databases', label: 'Databases', checked: true },
      { value: 'design automation', label: 'Design Automation', checked: true },
      { value: 'embedded & real-time systems', label: 'Embedded & Real-Time Systems', checked: true },
      { value: 'high-performance computing', label: 'High-Performance Computing', checked: true },
      { value: 'mobile computing', label: 'Mobile Computing', checked: true },
      { value: 'measurement and perf. analysis', label: 'Measurement and Perf. Analysis', checked: true },
      { value: 'operating systems', label: 'Operating Systems', checked: true },
      { value: 'programming languages', label: 'Programming Languages', checked: true },
      { value: 'software engineering', label: 'Software Engineering', checked: true },
    ],
  },
  {
    id: 'theory',
    name: 'Theory',
    options: [
      { value: 'algorithms & complexity', label: 'Algorithms & Complexity', checked: true },
      { value: 'cryptography', label: 'Cryptography', checked: true },
      { value: 'logic & verification', label: 'logic & verification', checked: true },
    ],
  },
  {
    id: 'interdisciplinary areas',
    name: 'Interdisciplinary Areas',
    options: [
      { value: 'comp. bio & bioinformatics', label: 'Comp. Bio & Bioinformatics', checked: true },
      { value: 'computer graphics', label: 'Computer Graphics', checked: true },
      { value: 'economics & computation', label: 'Economics & Computation', checked: true },
      { value: 'human-computer interaction', label: 'Human-Computer Interaction', checked: true },
      { value: 'robotics', label: 'Robotics', checked: true },
      { value: 'visualization', label: 'Visualization', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example( {institutions, people}) {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const data = useMemo(
    () =>
      institutions,
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank',
        className: "py-4 whitespace-nowrap text-sm font-medium text-gray-900"
      },
      {
        Header: 'Institution',
        accessor: 'name',
      },
      {
        Header: 'Count',
        accessor: 'count',
      },
      {
        Header: 'Ranked Faculty',
        accessor: 'numFaculty',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  const dotStyle = {
    height: '4px',
    width: '4px',
    backgroundColor: '#333333',
    borderRadius: '50%',
  };

  return (
    <div>
      <Head>
        <title>Base CaSe</title>
      </Head>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Research Areas</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">BaseCS</h1>
              <div className="flex items-center">
                <a className='p-2 text-sm font-medium text-gray-600 hover:text-blue-600'>Methodology</a>
                <span className='text-gray-700'>|</span>
                <a className='pl-2 py-2 text-sm font-medium text-gray-600 hover:text-blue-600'>For developers</a>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-10 pt-6'>
              <div className='hidden lg:block'>
                <h2 id="products-heading" className='text-2xl font-bold text-gray-900 pb-2'>
                  Research Areas
                </h2>
                {/* Filters */}
                <form>
                  {filters.map((section) => (
                    <Disclosure defaultOpen={true} as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
              <div className="lg:col-span-3">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm: lg:px-8">
                      <div className="overflow-hidden">
                        <table {...getTableProps()} className="min-w-full">
                          <thead className="border-b">
                            {headerGroups.map(headerGroup => (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                  <th
                                    {...column.getHeaderProps()}
                                    className="text-sm font-medium text-gray-900 pb-4 text-left"
                                  >
                                    {column.render('Header')}
                                  </th>
                                ))}
                              </tr>
                            ))}
                          </thead>
                          <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                              prepareRow(row)
                              return (
                                <tr {...row.getRowProps()}>
                                  {row.cells.map(cell => {
                                    // console.log(cell);
                                    return (
                                      <td
                                        {...cell.getCellProps()}
                                        td className={`text-sm text-gray-900 font-light py-4 whitespace-nowrap ${cell.column.className ?? ""}`}
                                      >
                                        {cell.render('Cell')}
                                      </td>
                                    )
                                  })}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

// API Calls 
// This function gets called at build time
export async function getStaticProps() {
  // GET LIST OF INSTITUTIONS
  const res = await fetch("http://localhost:8000/api/v0/institutions");
  const institutions = await res.json()

  // const people_res = await fetch("http://localhost:8000/api/v0/people");
  // const people = await people_res.json()

  let rank = 1;
  institutions.map(function(ele){
      ele.rank=rank;
      ele.count=0;
      ele.numFaculty = ele.FACULTY.length;
      rank++;
      return ele;
    });

  return {
    props: {
      institutions,
      // people
    },
    revalidate: 30, // fetch data at most every 30s when a request comes in.
  }
}