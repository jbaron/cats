//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module Cats.View {



export function showCompilationResults(data:Cats.CompileResults) {

            if (data.errors && (data.errors.length > 0)) {
                IDE.problemResult.setData(data.errors);
                return;
            }
            
            IDE.problemResult.setData([]);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console123.log( stamp + " Successfully compiled " + Object.keys(data.source).length + " file(s).\n");
    }
    
}