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

import * as v0TypeDocJson from './json/0.0.1.json';

// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const IntroMarkdown = require('md/introduction');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const InstallMarkdown = require('md/installation');

const docSections = {
    introduction: 'introduction',
    installation: 'installation',
    tlNetwork: 'tlNetwork',
    trustline: 'trustline',
    typings: constants.TYPES_SECTION_NAME,
};

const docsInfoConfig: DocsInfoConfig = {
    id: 'trustlines-network',
    type: SupportedDocJson.TypeDoc,
    displayName: 'Web3 Wrapper',
    packageUrl: 'https://github.com/trustlines-network/clientlib',
    menu: {
        introduction: [docSections.introduction],
        installation: [docSections.installation],
        tlNetwork: [docSections.tlNetwork],
        trustline: [docSections.trustline],
        types: [docSections.typings],
    },
    sectionNameToMarkdown: {
        [docSections.introduction]: IntroMarkdown,
        [docSections.installation]: InstallMarkdown,
    },
    sectionNameToModulePath: {
        [docSections.tlNetwork]: ['"TLNetwork"'],
        [docSections.trustline]: ['"Trustline"'],
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
            'TLEvent',
            'TLNetworkConfig',
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
            Trustline: docSections.trustline,
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
