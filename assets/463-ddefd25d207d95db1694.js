"use strict";(self.webpackChunkmiddle_front=self.webpackChunkmiddle_front||[]).push([[463],{39222:(e,r,t)=>{t.d(r,{$I:()=>o});var l=t(39708);var a=t(39181);let u;let n={};let i=(0,l.J1)(u||(u=(e=>e)`
    query GetTracksForGuest($query: GetTrackListInput!) {
  getTracksForGuest(query: $query) {
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
    `));function o(e){let r={...n,...e};return a.I(i,r)}function s(e){let r={...n,...e};return Apollo.useLazyQuery(i,r)}function c(e){let r={...n,...e};return Apollo.useSuspenseQuery(i,r)}},25463:(e,r,t)=>{t.r(r),t.d(r,{default:()=>v});var l=t(95697);var a=t(76016);var u=t(26608);var n=t(5328);var i=t(96610);var o=t(39222);var s=t(74848);var c;function v(){var e;let r=(0,a.A)({limit:50});let t=(0,u.A)({onChange:()=>r.reset()});let{data:v,loading:d}=(0,o.$I)({variables:{query:{pagination:{limit:100,offset:r.value.offset},search:t.value}}});let[f]=(0,i.U)();let{audioRef:k,setTracks:p,setTrackIndex:y,trackIndex:g,trackStates:h,setTrackState:A}=(0,l.A)();let{tracks:m=[],count:T=0}=null!==(e=null==v?void 0:v.getTracksForGuest)&&void 0!==e?e:{};let b=async(e,r)=>{let{available:t,id:l,__typename:a,...u}=e;await f({variables:{input:{track:u,playlistId:r}}})};return d?c||(c=(0,s.jsx)("h1",{children:"Loading..."})):(0,s.jsx)(n.A,{tracks:m,count:T,pagination:r,search:t,onTogglePlay:(e,r)=>{if(g===e){var t,l;h[r]?null==k||null===(t=k.current)||void 0===t||null===(t=t.audio.current)||void 0===t||t.pause():null==k||null===(l=k.current)||void 0===l||null===(l=l.audio.current)||void 0===l||l.play(),A(r,!h[r])}else p(m),y(e),A(r,!0)},onAddTrack:b})}}}]);