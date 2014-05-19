/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define('ace/theme/cats', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {


exports.isDark = false;
exports.cssClass = "ace-cats";
exports.cssText = ".ace-cats .ace_gutter {\
background: #f8f8f8;\
color: #999;\
}\
.ace-cats .ace_print-margin {\
width: 1px;\
background: rgba(128, 128, 128, .1);\
}\
.ace-cats .ace_fold {\
background-color: #6B72E6;\
}\
.ace-cats {\
background-color: #FFFFFF;\
}\
.ace-cats .ace_cursor {\
border-left: 2px solid #000;\
}\
.ace-cats .ace_overwrite-cursors .ace_cursor {\
border-bottom: 1px solid #000;\
}\
.ace-cats .ace_invisible {\
color: rgb(191, 191, 191);\
}\
.ace-cats .ace_storage,\
.ace-cats .ace_keyword {\
color: #00F;\
font-weight: bold;\
}\
.ace-cats .ace_constant {\
color: #00F;\
font-weight: bold;\
}\
.ace-cats .ace_invalid {\
background-color: rgba(255, 0, 0, .1);\
color: #F00;\
}\
.ace-cats .ace_support.ace_function,\
.ace-cats .ace_support.ace_constant,\
.ace-cats .ace_support.ace_type,\
.ace-cats .ace_support.ace_class {\
color: #660E7A;\
font-weight: bold;\
}\
.ace-cats .ace_keyword.ace_operator {\
color: inherit;\
font-weight: normal;\
}\
.ace-cats .ace_string {\
color: #CB7E00;\
}\
.ace-cats .ace_comment {\
color: #808080;\
}\
.ace-cats .ace_comment.ace_doc.ace_tag {\
color: #005050;\
font-weight: bold;\
}\
.ace-cats .ace_constant.ace_numeric {\
color: #F0F;\
}\
.ace-cats .ace_xml-pe {\
color: #666;\
}\
.ace-cats .ace_heading {\
color: #00F;\
font-weight: bold;\
}\
.ace-cats .ace_list {\
color: #666;\
}\
.ace-cats .ace_meta.ace_tag {\
color: #00F;\
}\
.ace-cats .ace_string.ace_regexp {\
color: #007C00;\
}\
.ace-cats .ace_marker-layer .ace_selection {\
background: #B0C5E3;\
}\
.ace-cats.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFF;\
border-radius: 2px;\
}\
.ace-cats .ace_marker-layer .ace_step {\
background: #FF0;\
}\
.ace-cats .ace_marker-layer .ace_stack {\
background: #A4E565;\
}\
.ace-cats .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-cats .ace_marker-layer .ace_active-line {\
background: rgba(128, 128, 128, 0.1);\
}\
.ace-cats .ace_gutter-active-line {\
background-color : #dcdcdc;\
}\
.ace-cats .ace_marker-layer .ace_selected-word {\
background: #E4E4FF;\
}\
.ace-cats .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}\
.ace-cats .ace_variable.ace_parameter {\
color: #458383;\
}\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
