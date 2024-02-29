!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e){const n=document.title;document.title=e,setTimeout((()=>document.title=n),3e3)}function n(e,n,t,o){return new(t||(t=Promise))((function(r,i){function s(e){try{c(o.next(e))}catch(e){i(e)}}function l(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(s,l)}c((o=o.apply(e,n||[])).next())}))}function t(e,n){const t=e.length>n.length?e.length:n.length;return 0===t?1:(t-function(e,n){if(0===e.length)return n.length;if(0===n.length)return e.length;const t=[],o=e.replace(/\s+/,""),r=n.replace(/\s+/,"");for(let e=0;e<=o.length;++e){t.push([e]);for(let n=1;n<=r.length;++n)t[e][n]=0===e?n:Math.min(t[e-1][n]+1,t[e][n-1]+1,t[e-1][n-1]+(o[e-1]===r[n-1]?0:1))}return t[o.length][r.length]}(e,n))/t}function o(e,n){let o={element:null,similarity:0,value:null};for(const r of n){const n=t(r.value,e);if(1===n)return{element:r.element,value:r.value,similarity:n};n>o.similarity&&(o={element:r.element,value:r.value,similarity:n})}return o}"function"==typeof SuppressedError&&SuppressedError;class r{static question(e){console.log("%c[QUESTION]: %s","color: cyan",e)}static bestAnswer(e,n){console.log("%c[BEST ANSWER]: %s","color: green",`"${e}" with a similarity of ${function(e){return Math.round(100*e*100)/100+"%"}(n)}`)}static array(e){console.log("[CORRECTS] ",e)}static response(e){console.log("Original:\n"+e.response),console.log("Normalized:\n"+e.normalizedResponse)}}function i(e,n=!0){n&&(e=e.toLowerCase());return e.replace(/\n+/gi,"\n").replace(/(\n\s*\n)+/g,"\n").replace(/[ \t]+/gi," ").trim().replace(/^[a-z\d]\.\s/gi,"").replace(/\n[a-z\d]\.\s/gi,"\n")}var s,l;!function(e){e.SYSTEM="system",e.USER="user",e.ASSISTANT="assistant"}(s||(s={})),function(e){e.TEXT="text",e.IMAGE="image_url"}(l||(l={}));const c="\nAct as a quiz solver for the best notation with the following rules:\n- If no answer(s) are given, answer the statement as usual without following the other rules, providing the most detailed, complete and precise explanation. \n  But for the calculation provide this format 'result: <result of the equation> explenation: <answer>'\n- For 'put in order' questions, provide the position of the answer separated by a new line (e.g., '1\n3\n2') and ignore other rules.- Always reply in this format: '<answer 1>\n<answer 2>\n...'\n- Always reply in the format: '<answer 1>\n<answer 2>\n...'.\n- Retain only the correct answer(s).\n- Maintain the same order for the answers as in the text.\n- Retain all text from the answer with its description, content or definition.\n- Only provide answers that exactly match the given answer in the text.\n- The question always has the correct answer(s), so you should always provide an answer.\n- Always respond in the same language as the user's question.\n".trim(),a={url:null,system:{role:s.SYSTEM,content:c},history:[]};function u(e,t,o){return n(this,void 0,void 0,(function*(){const n=t.querySelectorAll("img");if(e.includeImages&&function(e){const n=e.match(/gpt-(\d+)/);return!!(null==n?void 0:n[1])&&Number(n[1])>=4}(e.model)&&0===n.length)return o;let r=[];const i=Array.from(n).map((e=>{return n=e,new Promise(((e,t)=>{const o=document.createElement("canvas"),r=o.getContext("2d");if(!r)return void e(null);const i=new Image;i.crossOrigin="Anonymous",i.onload=()=>{o.width=i.width,o.height=i.height,r.drawImage(i,0,0);const n=o.toDataURL("image/png");e(n)},i.onerror=e=>{t(e)},i.src=n.src}));var n})),s=(yield Promise.all(i)).filter((e=>null!==e));for(const e of s)r.push({type:l.IMAGE,image_url:{url:e}});return r.length>0?r.push({type:l.TEXT,text:o}):r=o,r}))}function f(e){const n=[],t=Array.from(e.querySelectorAll("tr")),o=[];t.map((e=>{const t=Array.from(e.querySelectorAll("td, th")).map(((e,n)=>{var t;const r=null===(t=e.textContent)||void 0===t?void 0:t.trim();return o[n]=Math.max(o[n]||0,(null==r?void 0:r.length)||0),null!=r?r:""}));n.push(t)}));const r=o.reduce(((e,n)=>e+n))+3*n[0].length+1,i="\n"+Array(r).fill("-").join("")+"\n",s=n.map((e=>"| "+e.map(((e,n)=>e.padEnd(o[n]," "))).join(" | ")+" |"));return s.shift()+i+s.join("\n")}function m(n,t){n.title&&e("Copied to clipboard"),navigator.clipboard.writeText(t.response)}function d(e,n,t){const o=n[0];if(1!==n.length||"true"!==o.getAttribute("contenteditable"))return!1;if(e.typing){let e=0;o.addEventListener("keydown",(function(n){if("Backspace"===n.key&&(e=t.response.length+1),e>t.response.length)return;n.preventDefault(),o.textContent=t.response.slice(0,++e),o.focus();const r=document.createRange();r.selectNodeContents(o),r.collapse(!1);const i=window.getSelection();null!==i&&(i.removeAllRanges(),i.addRange(r))}))}else o.textContent=t.response;return!0}function p(e,n,t){var o,r;const i=n[0];if(1!==n.length||"number"!==i.type)return!1;const s=null===(r=null===(o=t.normalizedResponse.match(/\d+([,.]\d+)?/gi))||void 0===o?void 0:o[0])||void 0===r?void 0:r.replace(",",".");if(void 0===s)return!1;if(e.typing){let e=0;i.addEventListener("keydown",(function(n){n.preventDefault(),"Backspace"===n.key&&(e=s.length+1),e>s.length||("."===s.slice(e,e+1)&&++e,i.value=s.slice(0,++e))}))}else i.value=s;return!0}function h(e,n,t){const s=null==n?void 0:n[0];if(!s||"radio"!==s.type)return!1;const l=Array.from(n).map((e=>{var n,t;return{element:e,value:i(null!==(t=null===(n=null==e?void 0:e.parentElement)||void 0===n?void 0:n.textContent)&&void 0!==t?t:"")}})).filter((e=>""!==e.value)),c=o(t.normalizedResponse,l);e.logs&&c.value&&r.bestAnswer(c.value,c.similarity);const a=c.element;return e.mouseover?a.addEventListener("mouseover",(()=>a.checked=!0),{once:!0}):a.checked=!0,!0}function g(e,n,t){const s=null==n?void 0:n[0];if(!s||"checkbox"!==s.type)return!1;const l=t.normalizedResponse.split("\n"),c=Array.from(n).map((e=>{var n,t;return{element:e,value:i(null!==(t=null===(n=null==e?void 0:e.parentElement)||void 0===n?void 0:n.textContent)&&void 0!==t?t:"")}})).filter((e=>""!==e.value));for(const n of l){const t=o(n,c);e.logs&&t.value&&r.bestAnswer(t.value,t.similarity);const i=t.element;e.mouseover?i.addEventListener("mouseover",(()=>i.checked=!0),{once:!0}):i.checked=!0}return!0}function v(e,n,t){if(0===n.length||"SELECT"!==n[0].tagName)return!1;const s=t.normalizedResponse.split("\n");e.logs&&r.array(s);for(let t=0;t<n.length&&s[t];++t){const l=n[t].querySelectorAll("option"),c=Array.from(l).map((e=>{var n;return{element:e,value:i(null!==(n=e.textContent)&&void 0!==n?n:"")}})).filter((e=>""!==e.value)),a=o(s[t],c);e.logs&&a.value&&r.bestAnswer(a.value,a.similarity);const u=a.element,f=u.closest("select");null!==f&&(e.mouseover?f.addEventListener("click",(()=>u.selected=!0),{once:!0}):u.selected=!0)}return!0}function y(e,n,t){const o=n[0];if(1!==n.length||"TEXTAREA"!==o.tagName&&"text"!==o.type)return!1;if(e.typing){let e=0;o.addEventListener("keydown",(function(n){n.preventDefault(),"Backspace"===n.key&&(e=t.response.length+1),e>t.response.length||(o.value=t.response.slice(0,++e))}))}else o.value=t.response;return!0}function w(e){return n(this,void 0,void 0,(function*(){e.config.cursor&&(e.questionElement.style.cursor="wait");const t=function(e){let n=e.innerText;const t=e.querySelectorAll(".accesshide");for(const e of t)n=n.replace(e.innerText,"");const o=e.querySelectorAll(".qtext table");for(const e of o)n=n.replace(e.innerText,"\n"+f(e)+"\n");return i(n,!1)}(e.form),o=e.form.querySelectorAll(e.inputQuery),l=yield function(e,t,o){return n(this,void 0,void 0,(function*(){const n=location.hostname+location.pathname;e.history&&a.url===n||(a.url=n,a.history=[]);const r=new AbortController,l=setTimeout((()=>r.abort()),2e4),c=yield u(e,t,o),f={role:s.USER,content:c},m=yield fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.apiKey}`},signal:e.timeout?r.signal:null,body:JSON.stringify({model:e.model,messages:[a.system,...a.history,f],temperature:.1,top_p:1,presence_penalty:0,max_tokens:2e3})});clearTimeout(l);const d=(yield m.json()).choices[0].message.content;return e.history&&(a.history.push(f),a.history.push({role:s.ASSISTANT,content:d})),{question:o,response:d,normalizedResponse:i(d)}}))}(e.config,e.questionElement,t).catch((e=>({error:e}))),c="object"==typeof l&&"error"in l;if(e.config.cursor&&(e.questionElement.style.cursor=e.config.infinite||c?"pointer":"initial"),c)console.error(l.error);else switch(e.config.logs&&(r.question(t),r.response(l)),e.config.mode){case"clipboard":!function(e){e.config.infinite||e.removeListener(),m(e.config,e.gptAnswer)}({config:e.config,questionElement:e.questionElement,gptAnswer:l,removeListener:e.removeListener});break;case"question-to-answer":!function(e){const n=e.questionElement;e.removeListener();const t=n.textContent;n.textContent=e.gptAnswer.response,n.style.whiteSpace="pre-wrap";let o=!0;n.addEventListener("click",(function(){n.style.whiteSpace=o?"":"pre-warp",n.textContent=o?t:e.gptAnswer.response,o=!o}))}({gptAnswer:l,questionElement:e.questionElement,removeListener:e.removeListener});break;case"autocomplete":!function(e){e.config.infinite||e.removeListener();const n=[d,y,p,v,h,g];for(const t of n)if(t(e.config,e.inputList,e.gptAnswer))return;m(e.config,e.gptAnswer)}({config:e.config,gptAnswer:l,inputList:o,questionElement:e.questionElement,removeListener:e.removeListener})}}))}const A=[],E=[];function x(e){const n=E.findIndex((n=>n.element===e));if(-1!==n){const e=E.splice(n,1)[0];e.element.removeEventListener("click",e.fn)}}function S(n){if(E.length>0){for(const e of E)n.cursor&&(e.element.style.cursor="initial"),e.element.removeEventListener("click",e.fn);return n.title&&e("Removed"),void(E.length=0)}const t=["checkbox","radio","text","number"].map((e=>`input[type="${e}"]`)).join(",")+", textarea, select, [contenteditable]",o=document.querySelectorAll(".formulation");for(const e of o){const o=e.querySelector(".qtext");if(null===o)continue;n.cursor&&(o.style.cursor="pointer");const r=w.bind(null,{config:n,questionElement:o,form:e,inputQuery:t,removeListener:()=>x(o)});E.push({element:o,fn:r}),o.addEventListener("click",r)}n.title&&e("Injected")}chrome.storage.sync.get(["moodleGPT"]).then((function(e){const n=e.moodleGPT;if(!n)throw new Error("Please configure MoodleGPT into the extension");n.code?function(e){document.body.addEventListener("keydown",(function(n){A.push(n.key),A.length>e.code.length&&A.shift(),A.join("")===e.code&&(A.length=0,S(e))}))}(n):S(n)}))}));
//# sourceMappingURL=MoodleGPT.js.map
