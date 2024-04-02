"use strict";(self.webpackChunkmiddle_front=self.webpackChunkmiddle_front||[]).push([[589],{83589:(e,a,r)=>{r.r(a),r.d(a,{default:()=>A});var l=r(96540);var t=r(47767);var u=r(76016);var n=r(95697);var i=r(26608);var o=r(5328);var s=r(39708);var c=r(39181);let v;let d={};let p=(0,s.J1)(v||(v=(e=>e)`
    query GetTracks($query: GetTrackListInput!) {
  getTracks(query: $query) {
    tracks {
      id
      realId
      name
      artist
      imageUrl
      audioUrl
      available
    }
    count
  }
}
    `));function k(e){let a={...d,...e};return Apollo.useLazyQuery(p,a)}function y(e){let a={...d,...e};return Apollo.useSuspenseQuery(p,a)}var f=r(96610);var g=r(74848);var h;function A(){var e;let{playlistId:a=""}=(0,t.g)();let r=(0,u.A)({limit:50});let[s,v]=(0,l.useState)("");let k=(0,i.A)({onChange:()=>r.reset()});let{audioRef:y,setTracks:A,setTrackIndex:T,trackIndex:b,trackStates:m,setTrackState:q}=(0,n.A)();let[w]=(0,f.U)();let{data:C,loading:I,refetch:L}=function(e){let a={...d,...e};return c.I(p,a)}({variables:{query:{playlistId:a,pagination:r.value,search:k.value}}});let{tracks:U=[],count:j=0}=null!==(e=null==C?void 0:C.getTracks)&&void 0!==e?e:{};let x=async e=>{await w({variables:{input:{playlistId:a,trackId:e}}}),await L()};return I?h||(h=(0,g.jsx)("h1",{children:"Loading..."})):(0,g.jsx)(o.A,{tracks:U,count:j,pagination:r,search:k,onTogglePlay:(e,r)=>{if(b===e&&a===s){var l,t;m[r]?null==y||null===(l=y.current)||void 0===l||null===(l=l.audio.current)||void 0===l||l.pause():null==y||null===(t=y.current)||void 0===t||null===(t=t.audio.current)||void 0===t||t.play(),q(r,!m[r])}else v(a),A(U),T(e),q(r,!0)},onDeleteTrack:x})}}}]);