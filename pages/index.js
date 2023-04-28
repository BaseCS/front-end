/* eslint-disable react/jsx-key */
import Head from 'next/head'
import { Fragment, useState, useMemo, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { useTable, useExpanded } from 'react-table/dist/react-table.development'
import * as React from 'react'

const filters = [
  {
    id: 'ai',
    name: 'AI',
    options: [
      {
        // values of the areas are a combination of the IDs of conferences right below the area name but don't have an associated checkbox with
        // could not find id for ACM SIGAI in https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb
        // area value includes values of subfield plus conferences that do not have checkboxes associated with it
        value: 'AI,6247512,6261998', 
        label: 'Artificial Intelligence', 
        checked: true,
        children: [
          { value: '6247512', label: 'AAAI', checked: true },
          { value: '6261998', label: 'IJCAI', checked: true },
        ],
      },
      { 
        // could not find id for CVF in https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb
        value: 'CV,6254300,6256393,6260632', 
        label: 'Computer Vision', 
        checked: true,
        children: [
          { value: '6254300', label: 'CVPR', checked: true },
          { value: '6256393', label: 'ECCV', checked: true },
          { value: '6260632', label: 'ICCV', checked: true },
        ],
      },
      { 
        value: 'ML,6260948,6267804,6263040,6267650', 
        label: 'Machine Learning & Data Mining', 
        checked: true,
        children: [
          // https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb did not have an ID for ICLR
          { value: '6260948', label: 'ICML', checked: true },
          { value: '6267804', label: 'NeurIPS', checked: true },
          { value: '6263040', label: 'KDD', checked: true },
        ],
      },
      { 
        value: 'NLP,6247782,6256634,6267542', 
        label: 'Natural Language Processing', 
        checked: true,
        children: [
          { value: '6247782', label: 'ACL', checked: true },
          { value: '6256634', label: 'EMNLP', checked: true },
          { value: '6267542', label: 'NAACL', checked: true },
        ],
      },
      { 
        value: 'IR,6271064,6276891', 
        label: 'The Web & Information Retrieval', 
        checked: true,
        children: [
          { value: '6271064', label: 'SIGIR', checked: true },
          { value: '6276891', label: 'WWW', checked: true },
        ],
      },
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    options: [
      { 
        value: 'CA,6252225,6262281,6264774,6259062', 
        label: 'Computer Architecture', 
        checked: true,
        children: [
          { value: '6252225', label: 'ASPLOS', checked: true },
          { value: '6262281', label: 'ISCA', checked: true },
          { value: '6264774', label: 'MICRO', checked: true },
          { value: '6259062', label: 'HPCA', checked: true },
        ],
      },
      { 
        value: 'CN,6270940,6267722', 
        label: 'Computer Networks', 
        checked: true, 
        children: [
          { value: '6270940', label: 'SIGCOMM', checked: true },
          { value: '6267722', label: 'NSDI', checked: true },
        ],
      },
      { 
        value: 'CSEC,6253603,6261874,6275131', 
        label: 'Computer Security', 
        checked: true,
        children: [
          { value: '6253603', label: 'CCS', checked: true },
          { value: '6261874', label: 'IEEE S&P ("Oakland")', checked: true },
          { value: '6275131', label: 'USENIX Security', checked: true },
        ],
      },
      { 
        value: 'DB,6271076,6275821,6260661,6268777', 
        label: 'Databases', 
        checked: true,
        children: [
          { value: '6271076', label: 'SIGMOD', checked: true },
          { value: '6275821', label: 'VLDB', checked: true },
          { value: '6260661', label: 'ICDE', checked: true },
          { value: '6268777', label: 'PODS', checked: true },
        ],
      },
      { 
        value: 'DA,6255215,6260525', 
        label: 'Design Automation', 
        checked: true,
        children: [
          { value: '6255215', label: 'DAC', checked: true },
          { value: '6260525', label: 'ICCAD', checked: true },
        ],
      },
      { 
        value: 'EMR,6256662,6270412,6270425', 
        label: 'Embedded & Real-Time Systems', 
        checked: true,
        children: [
          { value: '6256662', label: 'EMSOFT', checked: true },
          { value: '6270412', label: 'RTAS', checked: true },
          { value: '6270425', label: 'RTSS', checked: true },
        ],
      },
      { 
        value: 'HPC,6259079,6261624,6270683', 
        label: 'High-Performance Computing', 
        checked: true,
        children: [
          { value: '6259079', label: 'HPDC', checked: true },
          { value: '6261624', label: 'ICS', checked: true },
          { value: '6270683', label: 'SC', checked: true },
        ],
      },
      { 
        value: 'MC,6266315,6266333,6273282', 
        label: 'Mobile Computing', 
        checked: true,
        children: [
          { value: '6266315', label: 'MobiCom', checked: true },
          { value: '6266333', label: 'MobiSys', checked: true },
          { value: '6273282', label: 'SenSys', checked: true },
        ],
      },
      { 
        value: 'MP,6262060,6271071', 
        label: 'Measurement and Perf. Analysis', 
        checked: true,
        children: [
          { value: '6262060', label: 'IMC', checked: true },
          { value: '6271071', label: 'SIGMETRICS', checked: true },
        ],
      },
      { 
        value: 'OS,6267919,6271284,6257040,6257154,6275124', 
        label: 'Operating Systems', 
        checked: true,
        children: [
          { value: '6267919', label: 'OSDI', checked: true },
          { value: '6271284', label: 'SOSP', checked: true },
          { value: '6257040', label: 'EuroSys', checked: true },
          { value: '6257154', label: 'FAST', checked: true },
          { value: '6275124', label: 'USENIX ATC', checked: true },

        ],
      },
      { 
        value: 'PL,6268740,6268780,6260758,6267898', 
        label: 'Programming Languages', 
        checked: true,
        children: [
          { value: '6268740', label: 'PLDI', checked: true },
          { value: '6268780', label: 'POPL', checked: true },
          { value: '6260758', label: 'ICFP', checked: true },
          { value: '6267898', label: 'OOPSLA', checked: true },
        ],
      },
      { 
        value: 'SWE,6257902,6261641,6252198,6262456', 
        label: 'Software Engineering', 
        checked: true,
        children: [
          { value: '6257902', label: 'FSE', checked: true },
          { value: '6261641', label: 'ICSE', checked: true },
          { value: '6252198', label: 'ASE', checked: true },
          { value: '6262456', label: 'ISSTA', checked: true },
        ],
      },
    ],
  },
  {
    id: 'theory',
    name: 'Theory',
    options: [
      { 
        value: 'ALGO,6257859,6271259,6271259', 
        label: 'Algorithms & Complexity', 
        checked: true,
        children: [
          { value: '6257859', label: 'FOCS', checked: true },
          { value: '6271259', label: 'SODA', checked: true },
          { value: '6271259', label: 'STOC', checked: true },
        ],
      },
      { 
        value: 'CRYP,6254115,6256833', 
        label: 'Cryptography', 
        checked: true,
        children: [
          { value: '6254115', label: 'CRYPTO', checked: true },
          { value: '6256833', label: 'EuroCrypt', checked: true },
        ],
      },
      { 
        value: 'LV,6253528,6264365', 
        label: 'Logic & Verification', 
        checked: true,
        children: [
          { value: '6253528', label: 'CAV', checked: true },
          { value: '6264365', label: 'LICS', checked: true },
        ],
      },
    ],
  },
  {
    id: 'interdisciplinary areas',
    name: 'Interdisciplinary Areas',
    options: [
      { 
        value: 'CB,6262375,6270298', 
        label: 'Comp. Bio & Bioinformatics', 
        checked: true,
        children: [
          { value: '6262375', label: 'ISMB', checked: true },
          { value: '6270298', label: 'RECOMB', checked: true },
        ],
      },
      { 
        value: 'CG,6270960,6270996', 
        label: 'Computer Graphics', 
        checked: true,
        children: [
          { value: '6270960', label: 'SIGGRAPH', checked: true },
          { value: '6270996', label: 'SIGGRAPH Asia', checked: true },
          // https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb did not have an ID for EUROGRAPHICS
        ],
      },
      // { 
      //   value: 'CSE', 
      //   label: 'Computer science education', 
      //   checked: true,
      //   // https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb did not have an ID for SIGCSE
      // },
      { 
        value: 'EC,6256358,6276146', 
        label: 'Economics & Computation', 
        checked: true,
        children: [
          { value: '6256358', label: 'EC', checked: true },
          { value: '6276146', label: 'WINE', checked: true },
        ],
      },
      { value: 'HCI,6253698,6275148,6268969,6275079', 
        label: 'Human-Computer Interaction', 
        checked: true,
        children: [
          { value: '6253698', label: 'CHI', checked: true },
          // https://github.com/BaseCS/front-end/blob/main/conference_name_id_mapping.ipynb had 2 different IDs for UbiComp and Pervasive and was missing an ID for IMWUT
          { value: '6275148', label: 'UbiComp', checked: true },
          { value: '6268969', label: 'Pervasive', checked: true },
          { value: '6275079', label: 'UIST', checked: true },
        ],
       },
      { 
        value: 'ROB,6261615,6262229,6270541', 
        label: 'Robotics', 
        checked: true,
        children: [
          { value: '6261615', label: 'ICRA', checked: true },
          { value: '6262229', label: 'IROS', checked: true },
          { value: '6270541', label: 'RSS', checked: true },
        ],
      },
      {
        value: 'VIS,6275781,6275858', 
        label: 'Visualization', 
        checked: true,
        children: [
          { value: '6275781', label: 'VIS', checked: true },
          { value: '6275858', label: 'VR', checked: true },
        ],
      },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank',
        className: "py-4 whitespace-nowrap text-sm font-medium text-gray-900"
      },
      {
        Header: 'Institution',
        accessor: 'institution',
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

  const innerColumns = useMemo(
    () => [
      {
        Header: 'Faculty',
        accessor: 'faculty',
      },
      {
        Header: '(Raw) Publications',
        accessor: 'pub',
      },
      {
        Header: '(Adjusted) Publications',
        accessor: 'adj',
      },
    ],
    []
  )
  
  // requires a sorted table from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/institutions');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable({ columns, data }, useExpanded);

  const dotStyle = {
    height: '4px',
    width: '4px',
    backgroundColor: '#333333',
    borderRadius: '50%',
  };
  
  // Checkbox code
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const handleChange = (event) => {
    setCheckedBoxes({
      ...checkedBoxes,
      [event.target.value]: event.target.checked,
    });
  };
  useEffect(() => {
    console.log("checked boxes: ", checkedBoxes);
  }, [checkedBoxes]);

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
                                  <div key={option.value} className="flex-col">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      // defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                      onChange={handleChange}
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-blue-800"
                                    >
                                      {option.label}
                                    </label>
                                    {option.children && (<div className="ml-6 space-y-2 flex-col"> {option.children.map((childOption, childOptionIdx) => (
                                    <div key={childOption.value} className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${optionIdx}-${childOptionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={childOption.value}
                                        type="checkbox"
                                        // defaultChecked={childOption.checked}
                                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                        onChange={handleChange}
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}-${childOptionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {childOption.label}
                                      </label>
                                    </div>
                                  ))}
                                  </div>
                                  )}
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
            <h3 className='text-m text-blue-900 p-2'>CSRankings is a metrics-based ranking of top computer science institutions around the world. Click on the plus icon to expand areas. Click on the dropdown icon to expand institutions.</h3>
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
                                <div key={option.value} className="flex-col">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`parent-${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    // defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                    onChange={handleChange}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-blue-800"
                                  >
                                    {option.label}
                                  </label>
                                  {/* added child filters */}
                                  {option.children && (<div className="ml-6 space-y-2 flex-col"> {option.children.map((childOption, childOptionIdx) => (
                                    <div key={childOption.value} className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${optionIdx}-${childOptionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={childOption.value}
                                        type="checkbox"
                                        // defaultChecked={childOption.checked}
                                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                        onChange={handleChange}
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}-${childOptionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {childOption.label}
                                      </label>
                                    </div>
                                  ))}
                                  </div>
                                  )}
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
              
              {/* creating the table */}
              <div className="lg:col-span-3">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm: lg:px-8">
                      <div className="overflow-hidden">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50 text-center">
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
                          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                            {rows.map(row => {
                              prepareRow(row);
                              const isExpanded = row.isExpanded;
                              return (
                                <React.Fragment key={row.getRowProps().key}>
                                  <tr>
                                    <td>
                                      <span className="text-lg text-blue-500 p-2 rounded-full" {...row.getToggleRowExpandedProps()}>
                                        {isExpanded ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" /> : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />}
                                      </span>
                                    </td>
                                  </tr>
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                    // console.log(cell);
                                    return (
                                      <td
                                        {...cell.getCellProps()}
                                        className={`text-sm text-gray-900 font-light py-4 whitespace-nowrap ${cell.column.className ?? ""}`}
                                      >
                                        {cell.render('Cell')}
                                      </td>
                                    );
                                    })}
                                </tr>
                                {row.isExpanded && (
                                <tr>
                                  <td>
                                    <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      Details about {row.original.institution}
                                    </div>
                                    <table>
                                      <thead>
                                        <tr>
                                          {innerColumns.map((column) => (
                                            <th key={column.Header} className="text-sm text-center text-blue-700 pb-3 text-left">{column.Header}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {row.original.faculties.map((child) => (
                                          <tr key={child.id}>
                                            {innerColumns.map((column) => (
                                              <td key={column.id} className={`text-sm text-center text-gray-900 font-light py-2 whitespace-nowrap ${column.className ?? ""}`}>
                                                {child[column.accessor]}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                )}
                                </React.Fragment>
                              );
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

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/institutions');
  const data = await res.json();

  return { props: { rankings: data } };
};