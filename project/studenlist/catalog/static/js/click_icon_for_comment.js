
var status;
function click_icon_for_comment(icon){
    if(icon.id.indexOf('update')!=-1){
        status='update';
    }else{
        console.log='delete';
    }
    //$('.form_inline_block')[0].submit();
    post();
}


 async function post(e) {
        var formElem=$('.form_inline_block')[0];
        var formData = new FormData(formElem);
        formData.append('status', status);
        console.log(formData);
        let response = await fetch('1', {
          method: 'POST',
          body: formData
        });

        let result = await response.json();
    }
