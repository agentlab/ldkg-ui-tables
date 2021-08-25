/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { RankedTester, rankWith, uiTypeIs, withStoreToArrayProps } from '@agentlab/ldkg-ui-react';

import { JsonSchemaTable } from './table/BaseTableControl';

export const BaseTableArrayControlRenderer = (props: any) => {
  return <JsonSchemaTable {...props} />;
};

export const tableArrayControlTester: RankedTester = rankWith(3, uiTypeIs('aldkg:Array'));
export const BaseTableArrayControlWithStore = withStoreToArrayProps(BaseTableArrayControlRenderer);
