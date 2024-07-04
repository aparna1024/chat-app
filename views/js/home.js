
function openFileDialog() {
    document.getElementById("fileInput").click();
}
const body = document.getElementsByTagName("body")[0]; 
cuid = body.getAttribute('class'); 
console.log("cuid=", cuid);
var recipientId; 
var check=0;

// search function for any person , group and invitstion
function findfunction(){
    const find=document.getElementById("find");
    findValue=find.value.toUpperCase();
    let AllQue;
    let divforgp=document.getElementById("divforgroup").style.display;
    let divforin=document.getElementById("divforinvitation").style.display;
    if(divforgp=="block"){
      var list=document.getElementById("cgp");
    AllQue=list.getElementsByClassName('gpfrndiv');

    }else if(divforin=="block"){
    var list=document.getElementById("divforinvitation");
    AllQue=list.getElementsByClassName('indiv');
    }
    else{
      var list=document.getElementById("divforchat");
      AllQue=list.getElementsByClassName('frndiv');
    }
    let ListSub
    for(var i=0;i<AllQue.length;i++){
        ListSub=AllQue[i].getElementsByTagName('div')[2];
        hr=AllQue[i].getElementsByTagName('hr')[0];
        if(ListSub){
        let SubValue=ListSub.innerText;
        if(SubValue.toUpperCase().indexOf(findValue)>-1 ){
            AllQue[i].style.display="";
            hr.style.display="flex";
        }else{
            AllQue[i].style.display="none";
            hr.style.display="none";
        }
        }
    }
  }


  function removeaddmemberdiv(){
    document.getElementById("addmemberdiv").style.display="none";
    document.getElementById("topmaindiv").style.display="flex";
  }

  
  document.getElementById("createnewgp").addEventListener("click",function(){
    const gpnm=document.getElementById("newgpname").value;
    gpname=gpnm.trim()
    var date=new Date();
    console.log(date);              
    var mnth=date.getMonth()+1;
    var yr=date.getFullYear();
    var dt=date.getDate();
    let gpcreatedate=dt+"-"+mnth+"-"+yr;
    if(gpname == ""){
      alert("please enter valid group name!!!");
    }else{
    gpcreate(gpname,gpcreatedate,function(e){
      if(e){
        document.getElementById("newgpname").value="";
        const d=e.then((promisedata) => {
      alert("group is created!!!!");
      const cgp=document.getElementById("cgp");
      const div=document.createElement("div");
      div.setAttribute("class",`frndmaindiv ${promisedata._id} ${promisedata.gpname} gp`);
      div.setAttribute('id',`leftChat${promisedata._id}`);
      const div1=document.createElement("div");
      const div1img=document.createElement('img');
      div1img.setAttribute('class',"frnduser");
      div1img.setAttribute('src',"./img/bydefaultprofilepic.png");
      const div12=document.createElement('div');
      div12.setAttribute("class","frndname");
      div12.innerText=promisedata.gpname;
      div1.appendChild(div1img);
      div.appendChild(div1);
      div.appendChild(div12);
      cgp.prepend(document.createElement('hr'));
      cgp.prepend(div);
      div.addEventListener('click',function(){
        opengpr(promisedata._id,promisedata.gpname);
      })
    
    }); 
      }else{
        alert("something wrong!!!");
      }
    })
  }
  })

  function gpcreate(gpname,gpcreatedate,callback){
    fetch('/creatgp',{
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({gpname:gpname,gpcreatedate:gpcreatedate}),
      }).then(function(response){
        if(response.status==204){
          callback();
        }
        else if(response.status==200){
          const data=response.json();
          callback(data);
        }else{
        callback();
        }
      })
    }
    const rightmain=document.getElementById("rightmain");
    const messgimg=document.getElementById("messgimg");
    const rightforinvitation=document.getElementById("rightforinvitation");
    function removecurrchat(){
      rightmain.style.display="none";
        messgimg.style.display="block";
    }
    function removegpinvitations(){
      messgimg.style.display="block";
      rightmain.style.display="none";
      rightforinvitation.style.display="none";
    }

    const searchicon=document.getElementById("searchicon");
    const search=document.getElementById("search");
    searchicon.addEventListener("click",function(){
        if(search.style.display=="none"){
          search.style.display="block";
        }
        else{
          search.style.display="none";
        }
    })
     document.getElementById("myprofile").addEventListener("click",function(){
        window.location.href = "/myprofile";
     })
      document.getElementById("group").addEventListener("click",function(){
      document.getElementById("divforchat").style.display="none";
      document.getElementById("divforgroup").style.display="block";
      document.getElementById("divforinvitation").style.display="none";
     })
     document.getElementById("chat").addEventListener("click",function(){
      document.getElementById("divforchat").style.display="block";
      document.getElementById("divforgroup").style.display="none";
      document.getElementById("divforinvitation").style.display="none";
     })
     document.getElementById("gpinvitation").addEventListener("click",function(){
      document.getElementById("divforinvitation").style.display="block";
      document.getElementById("divforchat").style.display="none";
      document.getElementById("divforgroup").style.display="none";
     })

     
const gpopentoright=document.querySelectorAll(".gp")
gpopentoright.forEach((action,i)=>{
  action.addEventListener("click",function(err){
    const gpid=`${action.classList[1]}`;
    const gpname=`${action.classList[2]}`;
    // const admembr=document.getElementById("admembr");
    // admembr.setAttribute("class",`${chatfrndid}`);
    const uchat = document.querySelectorAll(".uchat");
    uchat.forEach((k,i)=>{
      console.log(k);
      k.style.display="none";
    })
    
    const uchatgp=document.getElementById("userchat"+gpid).style.display="block";
    // const userchat=document.getElementById("userchat");
    // userchat.innerHTML="";
    opengpr(gpid,gpname);

  })
})


const edd=document.querySelectorAll(".clickforaddmember");
edd.forEach((action,i)=>{
  action.addEventListener("click",function(err){
    const userid=`${action.classList[1]}`;
    let gpid=document.getElementsByTagName("temp").innerText;
    console.log(">>>>>>>");
    console.log("userid="+userid);
    console.log("gpi="+gpid)
    var date=new Date();
      console.log(date);              
      var mnth=date.getMonth()+1;
      var yr=date.getFullYear();
      var dt=date.getDate();
      let currdate=dt+"-"+mnth+"-"+yr;

    fetch('/addmember',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({gpid:gpid,userid:userid,date:currdate}),
    }).then(function(res){
    if(res.status==200){
      alert(`group invitation is send successfully!!!`);
    }else if(res.status==300){
      alert(`member already exist in group!!!`);
    }else{
      alert("somthing went wrong!!");
    }
    })
  })
})
const chat=document.querySelectorAll(".chat")
chat.forEach((action,i)=>{
  action.addEventListener("click",function(err){
   
    chatfrndid=`${action.classList[1]}`;
     recipientId=chatfrndid;
     const uimg=`${action.classList[3]}`
     console.log("click on chat that user id= "+recipientId)
    const chatfrndname=`${action.classList[2]}`;
    const gpopentoright= document.getElementById("openchatinright")
    gpopentoright.innerText=chatfrndname;
    const openchatrightimg=document.getElementById("openchatrightimg");
    openchatrightimg.setAttribute("src",uimg);
    const cbtn= document.getElementById("sendMessg")
    cbtn.style.display="block";
    const gbtn= document.getElementById("sendgpMessg")
    gbtn.style.display="none";
    const sendMessg=document.getElementById("sendMessg");
    sendMessg.setAttribute("class",`sendmessg ${chatfrndid} bttn`)
    document.getElementById("rightmain").style.display="block";
    document.getElementById("addnewmember").style.display="none";
    messgimg.style.display="none";

    const uchat = document.querySelectorAll(".uchat");
    uchat.forEach((k,i)=>{
      console.log(k);
      k.style.display="none";
    })
    const uchatgp=document.getElementById("userchat"+chatfrndid).style.display="block";
    // const userchat=document.getElementById("userchat");
    // userchat.innerText="";
  })
})

const admembr=document.getElementById("admembr");
admembr.addEventListener("click",function(){
      const id=this.className;
      console.log("id="+id);
      document.getElementsByTagName("temp").innerText=id;
      document.getElementById("addmemberdiv").style.display="block";
      document.getElementById("topmaindiv").style.display="none";

    })

    
function opengpr(gpid,gpname){
    const gpopentoright= document.getElementById("openchatinright")
      gpopentoright.innerText=gpname;
      const sendMessg=document.getElementById("sendMessg");
      sendMessg.setAttribute("class",`sendmessg ${gpid} bttn`)
      const admembr=document.getElementById("admembr");
      admembr.setAttribute("class",`${gpid}`);
      const cbtn= document.getElementById("sendMessg")
      cbtn.style.display="none";
      const gbtn= document.getElementById("sendgpMessg")
      gbtn.style.display="block";
      gbtn.setAttribute("x",gpid);
      document.getElementById("openchatrightimg").setAttribute("src","./img/bydefaultprofilepic.png");
      document.getElementById("addnewmember").style.display="block";
      document.getElementById("rightmain").style.display="block";
      messgimg.style.display="none";
      socket.emit("joinGroup",gpid);
      
  }

  document.getElementById("sendgpMessg").addEventListener("click",function(){
    const msg=document.getElementById("typedmessg").value;
     const time=generateTime();
     const date=generateDate();
     console.log("time = "+time);
     console.log("date = "+date);
     const a=document.getElementById("sendgpMessg")
     const x=a.getAttribute("x");
     console.log(x);

    socket.emit('gpmessg',msg,cuid,time,date,x);
   
    document.getElementById("typedmessg").value="";
})
document.getElementById("sendMessg").addEventListener("click",function(){
    const msg=document.getElementById("typedmessg").value;
     const time=generateTime();
     const date=generateDate();
     console.log("recipientId for sending messg = "+recipientId);
     socket.emit('sendPrivateMessage', {msg,cuid,time,date,recipientId});
     document.getElementById("typedmessg").value="";
     check=1;
     messgappend(msg,recipientId,time,date,cuid);
})
function generateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes; // Ensure double digit minutes
    const timeString = hours + ':' + minutes + ' ' + ampm;
    return timeString;
}

function generateDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month; // Ensure double digit month
    let day = now.getDate();
    day = day < 10 ? '0' + day : day; // Ensure double digit day
    const dateString = year + '-' + month + '-' + day;
    return dateString;
}

const selectgp=document.querySelectorAll(".igp");
selectgp.forEach((action,i)=>{
  action.addEventListener("click",function(err){
    console.log("clicking on gp invitation div!!");
    const gpname=`${action.classList[2]}`;
    const gpid=`${action.classList[1]}`;
    console.log("gpname="+gpname);
    console.log("gpid="+gpid);
    const acceptbtn=document.getElementById("acceptgp");
    const rejectbtn=document.getElementById("rejectgp");
    acceptbtn.setAttribute("class",gpid);
    rejectbtn.setAttribute("class",gpid);

    const a=document.getElementById("gname")
    a.innerText=gpname
    messgimg.style.display="none";
    rightmain.style.display="none";
    rightforinvitation.style.display="block"; 

  })
})

const accept=document.getElementById("acceptgp")
accept.addEventListener("click",function(){
  const id=accept.getAttribute("class");
  console.log(id);
  gpstatus(id,"true",function(e){
    if(e){
      alert(e);
    }else{
      alert("gp invitation is accepted!!!");
      removegpinvitations();
      document.getElementById("ingp"+id).remove();
      document.getElementById("igp"+id).remove();
    }

  })

})

const reject=document.getElementById("rejectgp")
reject.addEventListener("click",function(){
  const id=reject.getAttribute("class");
  console.log(id);
  gpstatus(id,"reject",function(e){
    if(e){
      alert(e);
    }else{
      alert("gp invitation is rejected!!!");
      removegpinvitations();
      document.getElementById("ingp"+id).remove();
      document.getElementById("igp"+id).remove();
      
    }

})
})

function gpstatus(id,s,callback){
    fetch('/gpstatus',{
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({gpid:id,s:s}),
          }).then(function(res){
            if(res.status==200){
              callback();
            }else{
              callback("something went wrong!!!")
            }
          })
    }

    const socket = io();
  socket.emit("user_connected", cuid);

  socket.on('privateMessage',(msg,senderId,time,date,chatfrndid)=>{
    check=0;
    console.log(`Received private message: ${msg} from user ${senderId}`);
    console.log(`private msg= ${msg} cuid= ${senderId} date= ${date} time= ${time} chatfrndid= ${chatfrndid}`);
    messgappend(msg,chatfrndid,time,date,senderId);
  })

  function messgappend(msg,senderId,time,date,chatfrndid){
    const div1=document.createElement('div');
        const div2=document.createElement('div');
        const div3=document.createElement('div');
        const div4=document.createElement('div');
        div2.style.fontSize="10px";
        div1.style.padding='5px';
        div1.style.width="97%";
        div1.style.margin="5px"
        div1.appendChild(div2);
        div3.innerText=msg;
        div3.style.padding='5px';
        div4.innerText=date+" , "+time;
        div4.style.fontSize="10px";
        div2.style.color="gray";
        div3.style.width="98%";
        div4.style.color="gray";
        div1.appendChild(div3);
        div1.appendChild(div4);
        div1.style.borderRadius="5px";
        if(check==1){
          div1.style.textAlign = 'right';
          // div2.innerText="You";
          div1.style.backgroundColor="rgb(229, 243, 247)";
        }
        else{
          div1.style.backgroundColor=" rgb(247, 242, 242)";
        }
        document.getElementById("userchat"+senderId).appendChild(div1);
  }
  socket.on('gpmessg',(d,u)=>{
    console.log(u[0]);
        console.log(`rom server getting messg= ${d.messg} and gp is ${d.gpid} ...cid= ${d.gpMemberid}...date= ${d.date}...time= ${d.time}`);
        
        const div1=document.createElement('div');
        const div2=document.createElement('div');
        const div3=document.createElement('div');
        const div4=document.createElement('div');
        div2.innerText=u[0].username;
        div2.style.fontSize="10px";
        div1.style.padding='5px';
        div1.style.width="97%";
        div1.style.margin="5px"
        div1.appendChild(div2);
        div3.innerText=d.messg;
        div3.style.padding='5px';
        div4.innerText=d.date+" , "+d.time;
        div4.style.fontSize="10px";
        div2.style.color="gray";
        div3.style.width="98%";
        div4.style.color="gray";
        div1.appendChild(div3);
        div1.appendChild(div4);
        div1.style.borderRadius="5px";

        if(d.gpMemberid==cuid){
          div1.style.textAlign = 'right';
          div2.innerText="You";
          div1.style.backgroundColor="rgb(229, 243, 247)";
        }
        else{
          div1.style.backgroundColor="rgb(247, 242, 242)";
        }
        document.getElementById("userchat"+d.gpid).appendChild(div1);
      })
    
