let data = {
	ids: new Set(),
  	clazz: new Set(),
  	tag: new Set(),
  	attr: new Map()
}
export default function(tree) {
  
  tree.walk(node => {
	//console.log(node);
    //node.content[0] = reverse(node.content[0]);
	if(typeof node === 'object'){
    	console.log(node);
      	data.tag.add(node.tag);
      	if(node.attrs){
          	Object.keys(node.attrs).forEach(key => {
            	if(key === 'id'){
                  	data.ids.add(node.attrs[key])
                }else if(key === 'class'){
                	let clazz = node.attrs.class.trim().split(/\s+/);
                    clazz.forEach(item => {
                      data.clazz.add(item)
                    })
                }else{
                    // class & id should also be collected
                	data.attr.set(key,node.attrs[key])
                }
            })
        	
        }
    }
    return node;
  });
  console.log(data);
}