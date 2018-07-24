import * as _ from 'lodash';
import * as React from 'react';

import {
    constants,
    DocAgnosticFormat,
    DocsInfo,
    DocsInfoConfig,
    Documentation,
    SupportedDocJson,
    TypeDocNode,
} from '@0xproject/react-docs';

import * as v0TypeDocJson from './json/0.1.0.json';

// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const IntroMarkdown = require('md/introduction');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const InstallMarkdown = require('md/installation');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const AsyncMarkdown = require('md/async');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const UserMarkdown = require('md/guides/user');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const TrustlineMarkdown = require('md/guides/trustline');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const TransferMarkdown = require('md/guides/transfer');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const ExchangeMarkdown = require('md/exchange/exchange');

const docSections = {
    introduction: 'introduction',
    installation: 'installation',
    async: 'async',
    userGuide: 'create user',
    trustlineGuide: 'set up trustline',
    transferGuide: 'transfer',
    exchange: 'decentralized exchange',
    tlNetwork: 'tlNetwork',
    user: 'user',
    currencyNetwork: 'currencyNetwork',
    trustline: 'trustline',
    payment: 'payment',
    event: 'event',
    typings: constants.TYPES_SECTION_NAME,
};

const docsInfoConfig: DocsInfoConfig = {
    id: 'trustlines-network',
    type: SupportedDocJson.TypeDoc,
    displayName: 'Trustlines Network',
    packageUrl: 'https://github.com/trustlines-network/clientlib',
    menu: {
        introduction: [docSections.introduction],
        installation: [docSections.installation],
        async: [docSections.async],
        guides: [
            docSections.userGuide,
            docSections.trustlineGuide,
            docSections.transferGuide,
        ],
	exchange: [docSections.exchange],
        api: [
            docSections.tlNetwork,
            docSections.user,
            docSections.currencyNetwork,
            docSections.trustline,
            docSections.payment,
            docSections.event,
            docSections.typings,
        ],
    },
    sectionNameToMarkdown: {
        [docSections.introduction]: IntroMarkdown,
        [docSections.installation]: InstallMarkdown,
        [docSections.async]: AsyncMarkdown,
        [docSections.userGuide]: UserMarkdown,
        [docSections.trustlineGuide]: TrustlineMarkdown,
        [docSections.transferGuide]: TransferMarkdown,
        [docSections.exchange]: ExchangeMarkdown,
    },
    sectionNameToModulePath: {
        [docSections.tlNetwork]: ['"TLNetwork"'],
        [docSections.user]: ['"User"'],
        [docSections.currencyNetwork]: ['"CurrencyNetwork"'],
        [docSections.trustline]: ['"Trustline"'],
        [docSections.payment]: ['"Payment"'],
        [docSections.event]: ['"Event"'],
        [docSections.typings]: ['"typings"'],
    },
    menuSubsectionToVersionWhenIntroduced: {},
    sections: docSections,
    visibleConstructors: [
        docSections.tlNetwork,
    ],
    typeConfigs: {
        // Note: This needs to be kept in sync with the types exported in index.ts. Unfortunately there is
        // currently no way to extract the re-exported types from index.ts via TypeDoc :(
        publicTypes: [
            // General
            'TLNetworkConfig',
            'TLEvent',
            'Amount',
            'TLOptions',
            'TxObject',
            'EventFilterOptions',
            // User
            'UserObject',
            // Currency Network
            'Network',
            'NetworkDetails',
            'UserOverview',
            // Trustline
            'TrustlineObject',
            // Payment
            'Payment',
            'TLTxObject',
            'PathObject',
            'PaymentOptions',
        ],
        typeNameToExternalLink: {
            Web3: 'https://github.com/ethereum/wiki/wiki/JavaScript-API',
            Provider: 'https://github.com/0xProject/web3-typescript-typings/blob/f5bcb96/index.d.ts#L150',
            BigNumber: 'http://mikemcl.github.io/bignumber.js',
        },
        typeNameToPrefix: {
            Provider: 'Web3',
        },
        typeNameToDocSection: {
            TLNetwork: docSections.tlNetwork,
            User: docSections.user,
            CurrencyNetwork: docSections.currencyNetwork,
            Trustline: docSections.trustline,
            Payment: docSections.payment,
            Event: docSections.event,
        },
    },
};
const docsInfo = new DocsInfo(docsInfoConfig);

const availableVersions = ['0.0.1'];
const versionToDocJSON: { [semver: string]: object } = {
    [availableVersions[0]]: v0TypeDocJson,
};

export interface DocsProps {}

export interface DocsState {
    selectedVersion: string;
    docAgnosticFormat?: DocAgnosticFormat;
}

export class Docs extends React.Component<DocsProps, DocsState> {
    constructor(props: DocsProps) {
        super(props);
        this.state = {
            selectedVersion: availableVersions[1],
            docAgnosticFormat: docsInfo.convertToDocAgnosticFormat(v0TypeDocJson),
        };
    }
    public render(): React.ReactNode {
        const menuSubsectionsBySection = _.isUndefined(this.state.docAgnosticFormat)
            ? {}
            : docsInfo.getMenuSubsectionsBySection(this.state.docAgnosticFormat);
        return (
            <Documentation
                selectedVersion={this.state.selectedVersion}
                availableVersions={availableVersions}
                docsInfo={docsInfo}
                docAgnosticFormat={this.state.docAgnosticFormat}
                sourceUrl={this._getSourceUrl()}
                onVersionSelected={this._onVersionSelected.bind(this)}
            />
        );
    }
    private _onVersionSelected(semver: string): void {
        const selectedDocJSON = versionToDocJSON[semver];
        this.setState({
            selectedVersion: semver,
            docAgnosticFormat: docsInfo.convertToDocAgnosticFormat(selectedDocJSON as TypeDocNode),
        });
    }
    private _getSourceUrl(): string {
        const sourceUrl = `${docsInfoConfig.packageUrl}/blob/develop/src`;
        return sourceUrl;
    }
}

