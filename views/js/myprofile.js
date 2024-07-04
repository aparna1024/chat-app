
    document.getElementById("gotohome").addEventListener("click",function(){
        window.location.href = "/";
     })
    const un =document.getElementById("un");
    const ui=document.getElementById("ui");
    const up=document.getElementById("up");
    const updateimgbackground=document.getElementById("updateimgbackground");
    const unamediv=document.getElementById("changeusername");
    const changeprofilepicdiv=document.getElementById("changeprofileimg");
    const changepasswddiv=document.getElementById("changepassword");
    un.addEventListener("click",function(){
        updateimgbackground.style.display="none";
        unamediv.style.display="block";
        changeprofilepicdiv.style.display="none";
        changepasswddiv.style.display="none";
    })
    ui.addEventListener("click",function(){
        updateimgbackground.style.display="none";
        unamediv.style.display="none";
        changeprofilepicdiv.style.display="block";
        changepasswddiv.style.display="none";
    })
    up.addEventListener("click",function(){
        updateimgbackground.style.display="none";
        unamediv.style.display="none";
        changeprofilepicdiv.style.display="none";
        changepasswddiv.style.display="block";
    })   
    function canceldiv(){
        updateimgbackground.style.display="block";
        unamediv.style.display="none";
        changeprofilepicdiv.style.display="none";
        changepasswddiv.style.display="none";
    }

    
    document.getElementById("upname").addEventListener("click",function(){
        console.log("event click for update user name!!");
        const updatedname=document.getElementById("updatedname").value.trim();  // Trim to remove leading/trailing whitespace
        console.log("updatedname= "+updatedname);
        // Regular expression to validate the updated name (at least 1 character long)
        const nameRegex = /^[a-zA-Z]{1,}$/;

        // Check if the updated name matches the regular expression
        if (!updatedname.match(nameRegex)) {
            alert("Username must contain only letters.");
            return;  // Exit function early if validation fails
        }

         // Function to send updated name to the server 
        upname(updatedname,function(e){
            if(e){
            alert(e);
            }else{
            alert("user name is updated succesfully!!!!");
            document.getElementById("updatedname").value="";    // Clear the input field
            document.getElementById("uname").innerText=updatedname;     // Update displayed username
            }
        })
    
    })

    function upname(updatedname,callback){
        // Using Fetch API to send a PUT request to '/upname' endpoint
        fetch('/upname',{
            method:"PUT",   // HTTP method
            headers:{
                "Content-Type": "application/json",     // Request headers
            },
            body: JSON.stringify({updatedname:updatedname}),    // Convert data to JSON string
        }).then(function(res){
            // Handle response from the server
            if(res.status==200){
                callback(); // Call the callback function on success
            }else{
                // Call the callback function with an error message on failure
                callback("something went wrong!!!")
            }
        })
    }

    document.getElementById("uppasswd").addEventListener("click",function(){
        console.log("event click for update passwprd!!");
        const password=document.getElementById("password").value.trim(); // Get and trim the password

        // Regular expression to validate the password
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        // Check if the password matches the regular expression
        if (!passwordRegex.test(password)) {
        alert("Password must contain at least one digit, one special character, one lowercase letter, one uppercase letter, and be at least 8 characters long.");
        return;
        }

        console.log("password= "+password);

        // Function to send updated password to the server
        uppasswd(password,function(e){
            if(e){
            alert(e);
            }else{
            alert("user password is updated succesfully!!!!");
            document.getElementById("password").value="";   // Clear the input field
            }
        })
    })
    function uppasswd(password,callback){
        // Using Fetch API to send a PUT request to '/updatepasswd' endpoint
        fetch('/updatepasswd',{
            method:"PUT",       // HTTP method
            headers:{
                "Content-Type": "application/json",     // Request headers
            },
            body: JSON.stringify({updatepasswd:password}),      // Convert data to JSON string
        }).then(function(res){
            if(res.status==200){
                callback(); // Call the callback function on success
            }else{
                // Call the callback function with an error message on failure
                callback("something went wrong!!!")
            }
        })
    }