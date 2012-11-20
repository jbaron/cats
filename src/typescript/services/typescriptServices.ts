// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='es5compat.ts' />
///<reference path='..\compiler\typescript.ts' />
///<reference path='coreServices.ts' />
///<reference path='classifier.ts' />
///<reference path='compilerState.ts' />
///<reference path='scriptSyntaxAST.ts' />
///<reference path='braceMatchingManager.ts' />
///<reference path='symbolSet.ts' />
///<reference path='symbolTree.ts' />
///<reference path='overridesCollector.ts' />
///<reference path='languageService.ts' />
///<reference path='shims.ts' />
///<reference path='formatting\formatting.ts' />

module Services {
    export function copyDataObject(dst: any, src: any): any {
        for (var e in dst) {
            if (typeof dst[e] == "object") {
                copyDataObject(dst[e], src[e]);
            }
            else if (typeof dst[e] != "function") {
                dst[e] = src[e];
            }
        }
        return dst;
    }

    export function compareDataObjects(dst: any, src: any): bool {
        for (var e in dst) {
            if (typeof dst[e] == "object") {
                if (!compareDataObjects(dst[e], src[e]))
                    return false;
            }
            else if (typeof dst[e] != "function") {
                if (dst[e] !== src[e])
                    return false;
            }
        }
        return true;
    }

    export class TypeScriptServicesFactory {
        public createLanguageService(host: Services.ILanguageServiceHost): Services.ILanguageService {
            try {
                return new Services.LanguageService(host);
            }
            catch (err) {
                Services.logInternalError(host, err);
                throw err;
            }
        }

        public createLanguageServiceShim(host: ILanguageServiceShimHost): ILanguageServiceShim {
            try {
                var hostAdapter = new LanguageServiceShimHostAdapter(host);
                var languageService = this.createLanguageService(hostAdapter);
                return new LanguageServiceShim(host, languageService);
            }
            catch (err) {
                Services.logInternalError(host, err);
                throw err;
            }
        }

        public createClassifier(host: Services.IClassifierHost): Services.Classifier {
            try {
                return new Services.Classifier(host);
            }
            catch (err) {
                Services.logInternalError(host, err);
                throw err;
            }
        }

        public createClassifierShim(host: Services.IClassifierHost): ClassifierShim {
            try {
                return new ClassifierShim(host);
            }
            catch (err) {
                Services.logInternalError(host, err);
                throw err;
            }
        }

        public createCoreServices(host: Services.ICoreServicesHost): Services.CoreServices {
            try {
                return new Services.CoreServices(host);
            }
            catch (err) {
                Services.logInternalError(host.logger, err);
                throw err;
            }
        }

        public createCoreServicesShim(host: Services.ICoreServicesHost): CoreServicesShim {
            try {

                return new CoreServicesShim(host);
            }
            catch (err) {
                Services.logInternalError(host.logger, err);
                throw err;
            }
        }
    }
}

