"use strict";(self.webpackChunkmiddle_front=self.webpackChunkmiddle_front||[]).push([[699],{23699:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var r=n(47767);var i=n(58734);var a=n(78307);var l=n(97834);var s=n(30995);var o=n(8239);var c=n(86990);var d=n(83861);var h=n(54409);var u=n(37414);var m=n(39708);var g=n(95420);let p;let v={};let x=(0,m.J1)(p||(p=(e=>e)`
    mutation SignIn($input: AuthInput!) {
  signIn(input: $input) {
    token
  }
}
    `));var y=n(48855);var f=n(85738);let b=f.I4.form.withConfig({componentId:"sc-1hezrg9-0"})(["text-align:start;"]);let j=f.I4.div.withConfig({componentId:"sc-1hezrg9-1"})(["display:flex;margin:20px 0 0;"]);var A=n(74848);var w,k;function I(){let{accessToken:e,auth:t}=(0,u.A)();let n=(0,r.Zp)();let[m]=function(e){let t={...v};return g.n(x,t)}();let p=async e=>{let{email:r,password:i}=e;try{var a;let{data:e}=await m({variables:{input:{email:r,password:i}}});let l=null!==(a=null==e?void 0:e.signIn.token)&&void 0!==a?a:"";t(l),n("/home")}catch(e){(0,h.P)((0,y.n)(e),{autoClose:!1,type:"error"})}};return null!=e?w||(w=(0,A.jsx)(r.C5,{to:"/home"})):(0,A.jsx)(l.A,{sx:{disply:"flex",alignItems:"center",justifyContent:"center",width:"400px",height:"600px",flexDirection:"column"},children:(0,A.jsx)(a.lV,{onSubmit:p,render:({handleSubmit:e,submitting:t,submitError:n,pristine:r,hasValidationErrors:l,hasSubmitErrors:h,dirtySinceLastSubmit:u})=>(0,A.jsxs)(s.A,{direction:"column",spacing:4,children:[k||(k=(0,A.jsx)("h1",{children:"Sign in"})),(0,A.jsxs)(b,{onSubmit:e,children:[(0,A.jsxs)(o.Ay,{children:[(0,A.jsx)(o.Ay,{children:(0,A.jsx)(a.D0,{required:!0,name:"email",component:i.TextField,type:"text",label:"Email",validate:(0,d.k)(d.y.email("Incorrect email address"),d.y.maxLength(128,"Email length can't be greater then 128 characters"))})}),(0,A.jsx)(o.Ay,{sx:{mt:2},children:(0,A.jsx)(a.D0,{required:!0,name:"password",component:i.TextField,type:"password",label:"Password",validate:(0,d.k)(d.y.minLength(8,"Password length must be greater then 8 characters"),d.y.maxLength(128,"Password length must can't be be greater then 128 characters"))})}),n&&(0,A.jsx)("div",{className:"error",children:n})]}),(0,A.jsx)(j,{children:(0,A.jsx)(c.A,{variant:"contained",type:"submit",disabled:r||l||h&&!u||t,children:"Sign in"})})]})]})})})}},83861:(e,t,n)=>{n.d(t,{k:()=>d,y:()=>r});var r={};n.r(r),n.d(r,{email:()=>l,maxLength:()=>s,minLength:()=>o,skipEmpty:()=>c});let i=new RegExp(/^(\S){1,}@/.source+/^[A-Za-z0-9][A-Za-z0-9-]{0,}[A-Za-z0-9]\.[A-Za-z]{1,}$/.source.replace("^",""));let a=e=>i.test(e);function l(e="Email is incorrect."){return c(t=>a(t)?void 0:e)}function s(e,t="The text is too long."){return c(n=>n.trim().length>e?t:void 0)}function o(e,t="The text is too short."){return c(n=>n.trim().length<e?t:void 0)}function c(e){return t=>{var n;return null==t||"string"==typeof t&&0===t.trim().length||"number"==typeof t&&0===t||"boolean"==typeof t&&!1===t||Array.isArray(t)&&0===t.length?void 0:e(t)}}function d(...e){return(...t)=>e.reduce((e,n)=>e||n(...t),void 0)}}}]);