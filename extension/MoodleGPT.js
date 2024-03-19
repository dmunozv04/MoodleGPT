!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e){const t=document.title;document.title=e,setTimeout((()=>document.title=t),3e3)}function t(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{c(o.next(e))}catch(e){i(e)}}function l(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}c((o=o.apply(e,t||[])).next())}))}function n(e,t){const n=e.length>t.length?e.length:t.length;return 0===n?1:(n-function(e,t){if(0===e.length)return t.length;if(0===t.length)return e.length;const n=[],o=e.replace(/\s+/,""),r=t.replace(/\s+/,"");for(let e=0;e<=o.length;++e){n.push([e]);for(let t=1;t<=r.length;++t)n[e][t]=0===e?t:Math.min(n[e-1][t]+1,n[e][t-1]+1,n[e-1][t-1]+(o[e-1]===r[t-1]?0:1))}return n[o.length][r.length]}(e,t))/n}function o(e,t){let o={element:null,similarity:0,value:null};for(const r of t){const t=n(r.value,e);if(1===t)return{element:r.element,value:r.value,similarity:t};t>o.similarity&&(o={element:r.element,value:r.value,similarity:t})}return o}"function"==typeof SuppressedError&&SuppressedError;class r{static question(e){console.log("%c[QUESTION]: %s","color: cyan",e)}static bestAnswer(e,t){console.log("%c[BEST ANSWER]: %s","color: green",`"${e}" with a similarity of ${function(e){return Math.round(100*e*100)/100+"%"}(t)}`)}static array(e){console.log("[CORRECTS] ",e)}static response(e){console.log("Original:\n"+e.response),console.log("Normalized:\n"+e.normalizedResponse)}}function i(e,t=!0){t&&(e=e.toLowerCase());return e.replace(/\n+/gi,"\n").replace(/(\n\s*\n)+/g,"\n").replace(/[ \t]+/gi," ").trim().replace(/^[a-z\d]\.\s/gi,"").replace(/\n[a-z\d]\.\s/gi,"\n")}var s,l;!function(e){e.SYSTEM="system",e.USER="user",e.ASSISTANT="assistant"}(s||(s={})),function(e){e.TEXT="text",e.IMAGE="image_url"}(l||(l={}));const c="\nAct as a quiz solver for the best notation with the following rules:\n- If no answer(s) are given, answer the statement as usual without following the other rules, providing the most detailed, complete and precise explanation. \n- But for the calculation provide this format 'result: <result of the equation>'\n- For 'put in order' questions, maintain the answer in the order as presented in the question but assocy the correct order to it by usin this format '<order>:<answer 1>\n<order>:<answer 2>', ignore other rules.\n- Always reply in the format: '<answer 1>\n<answer 2>\n...'.\n- Retain only the correct answer(s).\n- Maintain the same order for the answers as in the text.\n- Retain all text from the answer with its description, content or definition.\n- Only provide answers that exactly match the given answer in the text.\n- The question always has the correct answer(s), so you should always provide an answer.\n- Always respond in the same language as the user's question.\n".trim(),a={role:s.SYSTEM,content:c};function u(e,n,o){return t(this,void 0,void 0,(function*(){const t=n.querySelectorAll("img");if(!e.includeImages||!function(e){const t=e.match(/gpt-(\d+)/);return!!(null==t?void 0:t[1])&&Number(t[1])>=4}(e.model)||0===t.length)return o;const r=[],i=Array.from(t).map((e=>function(e,t=.75){return new Promise(((n,o)=>{const r=document.createElement("canvas"),i=r.getContext("2d");if(!i)return o("Can't get the canvas context, ensure your navigator support canvas"),void r.remove();const s=new Image;s.crossOrigin="Anonymous",s.onload=()=>{r.width=s.width,r.height=s.height,i.drawImage(s,0,0);const e=r.toDataURL("image/png",t);n(e),r.remove()},s.onerror=e=>{o(e),r.remove()},s.src=e.src}))}(e))),s=yield Promise.allSettled(i);for(const t of s)"fulfilled"===t.status?r.push({type:l.IMAGE,image_url:{url:t.value}}):e.logs&&console.error(t.reason);return r.push({type:l.TEXT,text:o}),r}))}function f(e,n,o){return t(this,void 0,void 0,(function*(){const t=yield u(e,n,o),r={role:s.USER,content:t};if(!e.history)return{messages:[a,r]};let i;const l=JSON.parse(null!==(c=sessionStorage.moodleGPTHistory)&&void 0!==c?c:"null");var c;const f=function(){var e,t;const n=new URLSearchParams(document.location.search);return{host:document.location.host,cmid:null!==(e=n.get("cmid"))&&void 0!==e?e:"",attempt:null!==(t=n.get("attempt"))&&void 0!==t?t:"",history:[]}}();return i=null!==l&&function(e,t){const n=["host","cmid","attempt"];for(const o of n)if(e[o]!==t[o])return!1;return!0}(l,f)?l:f,{messages:[a,...i.history,r],saveResponse(t){e.history&&(i.history.push(r),i.history.push({role:s.ASSISTANT,content:t}),sessionStorage.moodleGPTHistory=JSON.stringify(i))}}}))}function m(e){const t=[],n=Array.from(e.querySelectorAll("tr")),o=[];n.map((e=>{const n=Array.from(e.querySelectorAll("td, th")).map(((e,t)=>{var n;const r=null===(n=e.textContent)||void 0===n?void 0:n.trim();return o[t]=Math.max(o[t]||0,(null==r?void 0:r.length)||0),null!=r?r:""}));t.push(n)}));const r=o.reduce(((e,t)=>e+t))+3*t[0].length+1,i="\n"+Array(r).fill("-").join("")+"\n",s=t.map((e=>"| "+e.map(((e,t)=>e.padEnd(o[t]," "))).join(" | ")+" |"));return s.shift()+i+s.join("\n")}function d(t,n){t.title&&e("Copied to clipboard"),navigator.clipboard.writeText(n.response)}function p(e,t,n){const o=t[0];if(1!==t.length||"true"!==o.getAttribute("contenteditable"))return!1;if(e.typing){let e=0;o.addEventListener("keydown",(function(t){if("Backspace"===t.key&&(e=n.response.length+1),e>n.response.length)return;t.preventDefault(),o.textContent=n.response.slice(0,++e),o.focus();const r=document.createRange();r.selectNodeContents(o),r.collapse(!1);const i=window.getSelection();null!==i&&(i.removeAllRanges(),i.addRange(r))}))}else o.textContent=n.response;return!0}function h(e,t,n){var o,r;const i=t[0];if(1!==t.length||"number"!==i.type)return!1;const s=null===(r=null===(o=n.normalizedResponse.match(/\d+([,.]\d+)?/gi))||void 0===o?void 0:o[0])||void 0===r?void 0:r.replace(",",".");if(void 0===s)return!1;if(e.typing){let e=0;i.addEventListener("keydown",(function(t){t.preventDefault(),"Backspace"===t.key&&(e=s.length+1),e>s.length||("."===s.slice(e,e+1)&&++e,i.value=s.slice(0,++e))}))}else i.value=s;return!0}function g(e,t,n){const s=null==t?void 0:t[0];if(!s||"radio"!==s.type)return!1;const l=Array.from(t).map((e=>{var t,n;return{element:e,value:i(null!==(n=null===(t=null==e?void 0:e.parentElement)||void 0===t?void 0:t.textContent)&&void 0!==n?n:"")}})).filter((e=>""!==e.value)),c=o(n.normalizedResponse,l);e.logs&&c.value&&r.bestAnswer(c.value,c.similarity);const a=c.element;return e.mouseover?a.addEventListener("mouseover",(()=>a.click()),{once:!0}):a.click(),!0}function v(e,t,n){const s=null==t?void 0:t[0];if(!s||"checkbox"!==s.type)return!1;const l=n.normalizedResponse.split("\n"),c=Array.from(t).map((e=>{var t,n;return{element:e,value:i(null!==(n=null===(t=null==e?void 0:e.parentElement)||void 0===t?void 0:t.textContent)&&void 0!==n?n:"")}})).filter((e=>""!==e.value));for(const t of l){const n=o(t,c);e.logs&&n.value&&r.bestAnswer(n.value,n.similarity);const i=n.element;e.mouseover?i.addEventListener("mouseover",(()=>i.click()),{once:!0}):i.click()}return!0}function y(e,t,n){if(0===t.length||"SELECT"!==t[0].tagName)return!1;const s=n.normalizedResponse.split("\n");e.logs&&r.array(s);for(let n=0;n<t.length&&s[n];++n){const l=t[n].querySelectorAll("option"),c=Array.from(l).slice(1).map((e=>{var t;return{element:e,value:i(null!==(t=e.textContent)&&void 0!==t?t:"")}})).filter((e=>""!==e.value)),a=o(s[n],c);e.logs&&a.value&&r.bestAnswer(a.value,a.similarity);const u=a.element,f=u.closest("select");null!==f&&(e.mouseover?f.addEventListener("click",(()=>u.selected=!0),{once:!0}):u.selected=!0)}return!0}function w(e,t,n){const o=t[0];if(1!==t.length||"TEXTAREA"!==o.tagName&&"text"!==o.type)return!1;if(e.typing){let e=0;o.addEventListener("keydown",(function(t){t.preventDefault(),"Backspace"===t.key&&(e=n.response.length+1),e>n.response.length||(o.value=n.response.slice(0,++e))}))}else o.value=n.response;return!0}function E(e){return t(this,void 0,void 0,(function*(){e.config.cursor&&(e.questionElement.style.cursor="wait");const n=function(e){let t=e.innerText;const n=e.querySelectorAll(".accesshide");for(const e of n)t=t.replace(e.innerText,"");const o=e.querySelectorAll(".qtext table");for(const e of o)t=t.replace(e.innerText,"\n"+m(e)+"\n");return i(t,!1)}(e.form),o=e.form.querySelectorAll(e.inputQuery),s=yield function(e,n,o){return t(this,void 0,void 0,(function*(){const t=new AbortController,r=setTimeout((()=>t.abort()),2e4),s=yield f(e,n,o),l=yield fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.apiKey}`},signal:e.timeout?t.signal:null,body:JSON.stringify({model:e.model,messages:s.messages,temperature:.1,top_p:.6,presence_penalty:0,max_tokens:2e3})});clearTimeout(r);const c=(yield l.json()).choices[0].message.content;return"function"==typeof s.saveResponse&&s.saveResponse(c),{question:o,response:c,normalizedResponse:i(c)}}))}(e.config,e.questionElement,n).catch((e=>({error:e}))),l="object"==typeof s&&"error"in s;if(e.config.cursor&&(e.questionElement.style.cursor=e.config.infinite||l?"pointer":"initial"),l)console.error(s.error);else switch(e.config.logs&&(r.question(n),r.response(s)),e.config.mode){case"clipboard":!function(e){e.config.infinite||e.removeListener(),d(e.config,e.gptAnswer)}({config:e.config,questionElement:e.questionElement,gptAnswer:s,removeListener:e.removeListener});break;case"question-to-answer":!function(e){const t=e.questionElement;e.removeListener();const n=t.textContent;t.textContent=e.gptAnswer.response,t.style.whiteSpace="pre-wrap";let o=!0;t.addEventListener("click",(function(){t.style.whiteSpace=o?"":"pre-warp",t.textContent=o?n:e.gptAnswer.response,o=!o}))}({gptAnswer:s,questionElement:e.questionElement,removeListener:e.removeListener});break;case"autocomplete":!function(e){e.config.infinite||e.removeListener();const t=[p,w,h,y,g,v];for(const n of t)if(n(e.config,e.inputList,e.gptAnswer))return;d(e.config,e.gptAnswer)}({config:e.config,gptAnswer:s,inputList:o,questionElement:e.questionElement,removeListener:e.removeListener})}}))}const A=[],S=[];function x(e){const t=S.findIndex((t=>t.element===e));if(-1!==t){const e=S.splice(t,1)[0];e.element.removeEventListener("click",e.fn)}}function q(t){if(S.length>0){for(const e of S)t.cursor&&(e.element.style.cursor="initial"),e.element.removeEventListener("click",e.fn);return t.title&&e("Removed"),void(S.length=0)}const n=["checkbox","radio","text","number"].map((e=>`input[type="${e}"]`)).join(",")+", textarea, select, [contenteditable]",o=document.querySelectorAll(".formulation");for(const e of o){const o=e.querySelector(".qtext");if(null===o)continue;t.cursor&&(o.style.cursor="pointer");const r=E.bind(null,{config:t,questionElement:o,form:e,inputQuery:n,removeListener:()=>x(o)});S.push({element:o,fn:r}),o.addEventListener("click",r)}t.title&&e("Injected")}chrome.storage.sync.get(["moodleGPT"]).then((function(e){const t=e.moodleGPT;if(!t)throw new Error("Please configure MoodleGPT into the extension");t.code?function(e){document.body.addEventListener("keydown",(function(t){A.push(t.key),A.length>e.code.length&&A.shift(),A.join("")===e.code&&(A.length=0,q(e))}))}(t):q(t)}))}));
//# sourceMappingURL=MoodleGPT.js.map
