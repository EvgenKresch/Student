
var status;
function edit_comment(id){

    /*if(icon.id.indexOf('update')!=-1){
        get_comment(id);
        status='update';
        return 0;
    }else{
        status='delete';
    }
    let form = icon.parentElement;
    form.status.value=status;
    form.submit();*/
    //post();

    get_comment(id);
}

function editComment(obj,id){
    var comment =$('#comment_'+id)[0];
    var text =comment.children.comment_text;
    var comment_update =comment.children.comment_update;
    var input=document.createElement('input');
    var cancel=document.createElement('button');
    var save=document.createElement('button');
    var div_button=document.createElement('div');
    input.value=obj.text;
    cancel.innerText='Отмена';
    save.innerText='Сохранить';
    cancel.className='cancel btn btn-default';
    save.className='save btn btn-default';
    cancel.onclick=function(){
        text.innerText=obj.text;
        text.style.display='';
        comment_update.style.visibility='visible';
        comment.removeChild(input);
        comment.removeChild(div_button);
    };
    save.onclick=function(){
        cancel.onclick();
        text.innerText=input.value;
        save_comment(id,input.value);
    };
    text.style.display='none';
    comment_update.style.visibility='hidden';
    text.after(input);
    div_button.appendChild(cancel);
    div_button.appendChild(save);
    comment.children.comment_delete.after(div_button);


}

function get_comment(id){
    $.ajax({
        method: "GET",
        data: {'id_comment':id},
        contentType: 'application/json',
        url: 'get_comment',
        success: function (response) {
            if (response.object_comment) {
                editComment(response,id);
            }
            else {
                console.log('undefined');
            }
        },
        error: function (response) {
            console.log('server error')
        }
    });
}


function save_comment(id,text){
    let csrfmiddlewaretoken = $('#form_create_comment')[0].csrfmiddlewaretoken;
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        data: {'id_comment':id,'text_comment':text,'csrfmiddlewaretoken':csrfmiddlewaretoken.value},
        url: 'save_comment',
        success: function (response) {
             console.log('saved: '+response.saved)
        },
        error: function (response) {
            console.log('server error')
        }
    });
}

//не работает, но оставить для будущего
 async function post(e) {
        var formElem=$('.form_inline_block')[0];
        var formData = new FormData(formElem);
        formData.append('status', status);
        console.log(formData);
        let response = await fetch('1', {
          method: 'POST',
          body: formData,
        });

        let result = await response.json();
    }
