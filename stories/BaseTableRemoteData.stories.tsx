/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import moment from 'moment';
import { variable } from '@rdfjs/data-model';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import {
  createModelFromState,
  rootModelInitialState,
  CollState,
  JSONSchema6forRdf,
  SparqlClientImpl,
} from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
} from '@agentlab/ldkg-ui-react';

import { tableRenderers } from '../src';

const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

const viewDescrs = [
  {
    '@id': 'rm:collectionView',
    '@type': 'rm:View',
    //'viewKind': 'rm:CollectionViewClass',
    title: 'Набор',
    description: 'Big table View with form',
    collsConstrs: [
      {
        '@id': 'rm:Folders_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Folders_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'nav:folderShape',
          },
        ],
      },
      {
        '@id': 'rm:Users_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:Users_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'pporoles:UserShape',
          },
        ],
      },
      {
        '@id': 'rm:ArtifactClasses_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:ArtifactClasses_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'rm:ArtifactClassesShape',
          },
        ],
      },
      {
        '@id': 'rm:ArtifactFormats_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:ArtifactFormats_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'rmUserTypes:_YwcOsRmREemK5LEaKhoOowShape',
          },
        ],
      },
      {
        '@id': 'rm:CollectionView_Artifacts_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:CollectionView_Artifacts_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'rm:ArtifactShape',
            conditions: {
              '@id': 'rm:CollectionView_Artifacts_Coll_Shape0_Condition',
              '@type': 'rm:QueryCondition',
              assetFolder: 'folders:samples_collection', //'folders:root',
            },
          },
        ],
        orderBy: [{ expression: variable('identifier0'), descending: false }],
        limit: 50,
      },
    ],
    type: 'VerticalLayout',
    options: {
      height: 'all-empty-space',
    },
    elements: [
      {
        '@id': 'ArtifactTable',
        type: 'Array',
        resultsScope: 'rm:CollectionView_Artifacts_Coll',
        options: {
          draggable: true,
          resizeableHeader: true,
          height: 'all-empty-space',
          style: { height: '100%' },
          order: [
            'identifier',
            'title',
            '@type',
            'artifactFormat',
            'description',
            'xhtmlText',
            'modified',
            'modifiedBy',
            '@id',
            'assetFolder',
          ],
          identifier: {
            width: 140,
            sortable: true,
            formater: 'link',
            editable: false,
            dataToFormater: { link: '@id' },
          },
          title: {
            formater: 'artifactTitle',
            dataToFormater: { type: 'artifactFormat' },
          },
          '@type': {
            width: 140,
            formater: 'dataFormater',
            query: 'rm:ArtifactClasses_Coll',
          },
          artifactFormat: {
            formater: 'dataFormater',
            query: 'rm:ArtifactFormats_Coll',
          },
          description: {
            //formater: 'tinyMCE',
            sortable: true,
          },
          xhtmlText: {
            formater: 'tinyMCE',
            tinyWidth: 'emptySpace' /** emptySpace, content*/,
            width: 300,
          },
          modified: {
            width: 140,
            formater: 'dateTime',
            sortable: true,
          },
          modifiedBy: {
            formater: 'dataFormater',
            query: 'rm:Users_Coll',
            key: 'name',
          },
          '@id': {
            width: 220,
          },
          assetFolder: {
            formater: 'dataFormater',
            query: 'rm:Folders_Coll',
          },
          //creator: {
          //  formater: 'userName',
          //},
          //created: {
          //  width: 140,
          //  formater: 'dateTime',
          //},
        },
      },
    ],
  },
];

const ViewShapeSchema: JSONSchema6forRdf = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'rm:ViewShape',
  '@type': 'sh:NodeShape',
  title: 'View Shape',
  description: 'Artifact Shape',
  targetClass: 'rm:View',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
  },
  required: ['@id', '@type'],
};

const viewDescrCollConstr = {
  '@id': 'rm:Views_Coll',
  entConstrs: [
    {
      '@id': 'rm:Views_EntConstr0',
      schema: ViewShapeSchema['@id'],
    },
  ],
};

const additionalColls: CollState[] = [
  // ViewKinds Collection
  /*{
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },*/
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('reqs2', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'RemoteArtifacts',
  component: Form,
} as Meta;

const Template: Story = (args: any) => (
  <Provider store={store}>
    <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
      <div style={{ height: '1000px' }}>
        <Form viewIri={viewDescrs[0]['@id']} viewsResultsScope={viewDescrCollConstr['@id']} />
      </div>
    </MstContextProvider>
  </Provider>
);

export const RemoteData = Template.bind({});
RemoteData.args = {};
