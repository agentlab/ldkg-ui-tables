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
import { rootModelInitialState, CollState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import {
  antdCells,
  antdControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewKindCollConstr,
  viewDescrCollConstr,
} from '@agentlab/ldkg-ui-react';

import { tableRenderers } from '../src';

const antdRenderers: RendererRegistryEntry[] = [...antdControlRenderers, ...antdLayoutRenderers, ...tableRenderers];

const viewKinds = [
  {
    '@id': 'rm:TableViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'Карточки',
    description: 'Big table View with form',
    collsConstrs: [
      {
        '@id': 'rm:ProductCard_Coll',
        '@type': 'rm:CollConstr',
        entConstrs: [
          {
            '@id': 'rm:ProductCard_Coll_Shape0',
            '@type': 'rm:EntConstr',
            schema: 'hs:ProductCardShape',
            /*conditions: {
              '@id': 'rm:CollectionView_Artifacts_Coll_Shape0_Condition',
              '@type': 'rm:QueryCondition',
              assetFolder: 'folders:samples_collection', //'folders:root',
            },*/
          },
        ],
        //orderBy: [{ expression: variable('identifier0'), descending: false }],
        //limit: 50,
      },
    ],
    elements: [
      {
        '@id': 'rm:_934jHd67',
        '@type': 'aldkg:VerticalLayout',
        options: {
          height: 'all-empty-space',
        },
        elements: [
          {
            '@id': 'ProductCardTable',
            '@type': 'aldkg:Array',
            resultsScope: 'rm:ProductCard_Coll',
            options: {
              draggable: true,
              resizeableHeader: true,
              height: 'all-empty-space',
              style: { height: '100%' },
              order: [
                'imageUrl',
                'name',
                'price',
                'saleValue',
                'categoryPopularity',
                'commentsCount',
                'starsValue',
                'questionsCount',
                'lastMonthSalesAmount',
                'lastMonthSalesValue',
                'perMonthSalesAmount',
                'perMonthSalesValue',
                'prevMonthSalesAmount',
                'prevMonthSalesValue',
                'salesAmountDiff',
                'totalSales',
                'totalSalesDiff',
                'stocks',
                'stocksDiffOrders',
                'stocksDiffReturns',
                'country',
                'brand',
                'seller',
                'identifier',
                'rootId',
                'photosCount',
                'firstParsedAt',
                'lastMonthParsedAt',
                'parsedAt',
                'prevParsedAt',
              ],
              imageUrl: {
                width: 60,
                formatter: 'image',
                editable: false,
              },
              identifier: {
                formatter: 'link',
                //dataToFormatter: { link: 'identifier' },
                sortable: true,
                editable: false,
              },
              name: {
                width: 340,
                formatter: 'link',
                dataToFormatter: { link: '@id' },
                sortable: true,
                editable: false,
              },
              country: {
                width: 60,
                sortable: true,
                editable: false,
              },
              brand: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
              price: {
                width: 60,
                sortable: true,
                editable: false,
              },
              saleValue: {
                width: 60,
                sortable: true,
                editable: false,
              },
              seller: {
                formatter: 'link',
                sortable: true,
                editable: false,
              },
              categoryPopularity: {
                width: 100,
                editable: false,
              },
              commentsCount: {
                width: 100,
                sortable: true,
                editable: false,
              },
              starsValue: {
                width: 100,
                sortable: true,
                editable: false,
              },
              questionsCount: {
                width: 100,
                sortable: true,
                editable: false,
              },
              lastMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              lastMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              perMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              perMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              prevMonthSalesAmount: {
                width: 150,
                sortable: true,
                editable: false,
              },
              prevMonthSalesValue: {
                width: 150,
                sortable: true,
                editable: false,
              },
              salesAmountDiff: {
                width: 150,
                sortable: true,
                editable: false,
              },
              totalSales: {
                width: 100,
                sortable: true,
                editable: false,
              },
              totalSalesDiff: {
                width: 150,
                sortable: true,
                editable: false,
              },
              stocks: {
                width: 100,
                sortable: true,
                editable: false,
              },
              stocksDiffOrders: {
                width: 100,
                sortable: true,
                editable: false,
              },
              stocksDiffReturns: {
                width: 100,
                sortable: true,
                editable: false,
              },
              rootId: {
                editable: false,
              },
              photosCount: {
                editable: false,
              },
              firstParsedAt: {
                editable: false,
              },
              lastMonthParsedAt: {
                editable: false,
              },
              parsedAt: {
                editable: false,
              },
              prevParsedAt: {
                editable: false,
              },
            },
          },
        ],
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'rm:TableViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'rm:TableViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [],
    // child ui elements configs
    elements: [],
  },
];

const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
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
const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'Remote/Mktp',
  component: Form,
} as Meta;

const Template: Story = (args: any) => (
  <Provider store={store}>
    <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
      <div style={{ height: '1080px' }}>
        <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
      </div>
    </MstContextProvider>
  </Provider>
);

export const RemoteData = Template.bind({});
RemoteData.args = {};
