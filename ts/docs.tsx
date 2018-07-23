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
const DeploymenttoolsMarkdown = require('md/deploymenttools');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const DevelopmentMarkdown = require('md/development');
// tslint:disable-next-line:no-implicit-dependencies no-var-requires
const DeploymentMarkdown = require('md/deployment');

const docSections = {
    introduction: 'introduction',
    deployment tools: 'deployment tools',
    development: 'development',
    deployment: 'deploy the contracts',
};

const docsInfoConfig: DocsInfoConfig = {
    id: 'trustlines-network',
    type: SupportedDocJson.TypeDoc,
    displayName: 'Trustlines Network',
    packageUrl: 'https://github.com/trustlines-network/contracts',
    menu: {
        introduction: [docSections.introduction],
        deployment tools: [docSections.deploymenttools],
        development: [docSections.development],
        deployment: [docSections.deployment],
        ],
    },
    sectionNameToMarkdown: {
        [docSections.introduction]: IntroMarkdown,
        [docSections.deploymenttools]: DeploymenttoolsMarkdown,
        [docSections.development]: DevelopmentMarkdown,
        [docSections.userGuide]: DeploymentMarkdown,
    },
    menuSubsectionToVersionWhenIntroduced: {},
    sections: docSections,
        typeNameToPrefix: {
            Provider: 'Web3',
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
