import * as postcss from 'postcss';
const data = {
    ids: new Set('aa'),
    classes: new Set(['bb', 'cc', 'ee']),
    tag: new Set(['html', 'body', 'div', 'p']),
    attr: {'data-id': 'qaz'}
}
let keyframes = new Set();
let fontFamily = new Set();
export default postcss.plugin('postcss-reverse-props', (options = {}) => {
    // Work with options here
    return root => {
        // collect keyframes & fontFace
       root.walkAtRules(atRule => {
           //console.log(atRule)
         	if(atRule.name === 'keyframes'){
            	keyframes.add(atRule.params)
            }
         	if(atRule.name === 'font-face'){
            	atRule.walkDecls(dec => {
                	//console.log(dec);
                  	if(dec.prop === 'font-family'){
                    	fontFamily.add(dec.value)
                    }
                })
            }
        });
      	console.log(keyframes,fontFamily);
        root.walkRules(rule => {
           console.log(rule)
          	let selector = rule.selector;
          	selector = selector.trim().split(/\s+/);
          	for(let i = 0; i < selector.length;i++){
              	let sel = selector[i];
            	if(sel[0] === '#'){
                	if(!data.ids.has(sel.substr(1))){
                    	rule.remove()
                    }
                }else if(sel[0] === '.'){
                	if(!data.classes.has(sel.substr(1))){
                    	rule.remove()
                    }
                }else if(sel[0] === '['){
                  let [,key,val] = sel.match(/([\w-]+)=\"(\w+)\"/);
                  if(!data.attr[key] || data.attr[key] != val){
                    rule.remove();
                  }
                }else{
                	if(!data.tag.has(sel)){
                    	rule.remove()
                    }
                }
            }
        });
    };
});

