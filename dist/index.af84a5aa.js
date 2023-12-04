const o=$(".siteList"),l=o.find("li.last"),e=localStorage.getItem("x"),t=JSON.parse(e),i=t||[{logo:"G",url:"https://gitee.com/gitte/"},{logo:"B",url:"https://www.bilibili.com"}],s=o=>o.replace("https://","").replace("http://").replace("www.","").replace(/\/.*/,""),c=()=>{o.find("li:not(.last)").remove(),i.forEach((o,e)=>{let t=$(`<li>
                <div class="site">
                <div class="logo">${o.logo}</div>
                <div class="link">${s(o.url)}</div>
                <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close">
                        </use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore(l);t.on("click",()=>{window.open(o.url)}),t.on("click",".close",o=>{o.stopPropagation(),i.splice(e,1),c()})})};c(),$(".addButton").on("click",()=>{let o=window.prompt("请问你要添加的网址是什么？");0!=o.indexOf("http")&&(o="https://"+o),i.push({logo:s(o)[0].toUpperCase(),url:o}),c()}),window.onbeforeunload=()=>{console.log("页面要关闭了");let o=JSON.stringify(i);console.log(i),console.log(o),window.localStorage.setItem("x",o)},$(document).on("keypress",o=>{let{key:l}=o;for(let o=0;o<i.length;o++)i[o].logo.toLowerCase()===l&&window.open(i[o].url)});
//# sourceMappingURL=index.af84a5aa.js.map
