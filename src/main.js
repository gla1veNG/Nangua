
const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')
const x=localStorage.getItem('x');/* x现在是个字符串*/
const xObject=JSON.parse(x)/*JSON.parse把字符串变对象*/
const hashMap=xObject||[
    {logo:'G',url:'https://gitee.com/gitte/'},
    {logo:'B',url:'https://www.bilibili.com'}
]

const simplifyUrl=(url)=>{
    return url.replace('https://','')
                .replace('http://')
                .replace('www.','')
                .replace(/\/.*/,'')//正则表达式，删除 以 / 开头的内容

}/*简化url*/

const render=()=>{
    $siteList.find('li:not(.last)')/*唯独不找last这个li */.remove();/*删除之前的hash再渲染 */
    hashMap.forEach((node,index)=>{
        const $li=$(`<li>
                <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close">
                        </use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
    $li.on('click',()=>{
        window.open(node.url);
    })/*代替a标签 */

    $li.on('click','.close',(e)=>{
        e.stopPropagation();//用a标签时，可以阻止冒泡，不让点击叉叉然后是跳转网页
        hashMap.splice(index,1);/*根据索引删除对应网址 */
        render();/*删除了再重新渲染 */
    })/*阻止冒泡，点击叉叉不会跳转 */
    })
}
render();

$('.addButton').on('click',()=>{
   let url= window.prompt('请问你要添加的网址是什么？');
   if(url.indexOf('http')!=0){
        url='https://'+url;
   }
   hashMap.push({
                    logo:simplifyUrl(url)[0].toUpperCase(),//toUpperCase()变大写
                    url:url
                }
    )
  render();
})

window.onbeforeunload=()=>{
    console.log('页面要关闭了');
    const string =JSON.stringify(hashMap);
    console.log(hashMap);
    console.log(string);
    // /*localStorage只能存字符串，可以用JSON.stringify把对象变字符串 */
    window.localStorage.setItem('x',string);
    // /*window可省略*/
    /*在本地存储里面设置一个x，x的值为string内容 */
}/*监听用户关闭*/

$(document).on('keypress',(e)=>{
    // const key =e.key;,上下是等同的
    const {key}=e;
    for(let i =0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){/*toLowerCase()变小写*/
            window.open(hashMap[i].url);
        }
    }
})