/* eslint-disable react/jsx-key */
import Head from 'next/head'
import { Fragment, useState, useMemo } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { useTable } from 'react-table/dist/react-table.development'

import SubfieldSelector from '../components/SubfieldSelector'

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '25%' }}>
      <SubfieldSelector name={'AI'} rows={[
        { area: "Artificial Intelligence" },
        { area: "Computer Vision" },
        { area: "Machine Learning and Data Mining" },
        { area: "Natural Language Processing" },
        { area: "The Web and Information Retrieval" },
      ]} />

      <SubfieldSelector name={'Systems'} rows={[
        { area: "Computer Architecture" },
        { area: "Computer Networks" },
        { area: "Computer Security" },
        { area: "Databases" },
        { area: "Design Automation" },
        { area: "Embedded and Real-Time Systems" },
        { area: "High-Performance Computing" },
        { area: "Mobile Computing" },
        { area: "Measurement and Perf. Analysis" },
        { area: "Operating Systems" },
        { area: "Programming Languages" },
        { area: "Software Engineering" },
      ]} />

      <SubfieldSelector name={'Theory'} rows={[
        { area: "Algorithms and Complexity" },
        { area: "Cryptography" },
        { area: "Logic and Verification" },
      ]} />

      <SubfieldSelector name={'Interdisciplinary Areas'} rows={[
        { area: "Comp. Bio and Bioinformatics" },
        { area: "Computer Graphics" },
        { area: "Economics and Computation" },
        { area: "Human-Computer Interaction" },
        { area: "Robotics" },
        { area: "Visualization" },
      ]} />
    </div>
  );
}