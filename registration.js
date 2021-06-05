import React, {useState} from 'react';
import { StyleSheet, Alert, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default function Form() {
    
    const [disable,setDisable] = useState({
        Name:false,
        Email:false,
        Phone:false,
        CompanyName:false,
        Address1:false,
        Address2:false,
        Pincode:false,
        Landmark:false, 
        Password:false,
        Confirm:false
    })
    const [user,setUser] = useState({
        Name:'',
        Email:'',
        Phone:'',
        CompanyName:'',
        Address1:'',
        Address2:'',
        Pincode:'',
        Landmark:'', 
        Password:'',
        Confirm:''
    })
    const [temp,setTemp] = useState({
        Name:0,
        Email:0,
        Phone:0,
        CompanyName:0,
        Address1:0,
        Address2:0,
        Pincode:0,
        Landmark:0, 
        Password:0, 
        Confirm:0
    })

    function reset() {
        setUser({
            Name:'',
            Email:'',
            Phone:'',
            CompanyName:'',
            Address1:'',
            Address2:'',
            Pincode:'',
            Landmark:'', 
            Password:'',
            Confirm:''
        })
        setDisable({
            Name:false,
            Email:false,
            Phone:false,
            CompanyName:false,
            Address1:false,
            Address2:false,
            Pincode:false,
            Landmark:false, 
            Password:false,
            Confirm:false
        })
    }

    function getEmails() {
       const db = firebase.database().ref();
       const dbtable = db.child("customers");
       dbtable.get().then((snapshot) => {
        if (snapshot.exists()) {
          const array2=snapshot.val();
          const userId=Object.keys(array2); 
          for(var i=0;i<3;i++){
          dbtable.child(userId[i]).child("Email").get().then((snapshot)=>{
            Email.push(snapshot.val());
          }).catch((error)=>{
            console.log(error)
          })
          }


        } else {
            console.log("Data Not available");
          }
        }).catch((error) => {
          console.error(error);
        });
      
        return Email;
    }

    function getPhone() {
        const db = firebase.database().ref();
        const dbtable =db.child("customers");
        dbtable.get().then((snapshot) => {
        if (snapshot.exists()) {
          const array2=snapshot.val();
          const userId=Object.keys(array2);
          // console.log(userId);
          for(var i=0;i<3;i++){
          dbtable.child(userId[i]).child("Phone").get().then((snapshot)=>{
            Phone.push(snapshot.val());
          }).catch((error)=>{
            console.log(error)
          })
          }
            
     
        } else {
          console.log("Data Not available");
        }
        }).catch((error) => {
          console.error(error);
        });
  
        return Phone;
    }
  

    const [Email,setEmail]=useState([getEmails()])
    const [Phone,setPhone]=useState([getPhone()])
          

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{textAlign:'center',fontSize:27, fontWeight:'bold'}}>CAKE POP RUSH</Text>
            </View> 
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{paddingBottom:25}}>
                    <Text style={{textAlign:'center',fontSize:18,marginTop:10}}>Sign Up and Enjoy all features of CAKEPOPRUSH</Text>
                    <Text style={styles.title}>Name:(First Name and Last Name)</Text>
                    <Text style={styles.error}>{(disable.Name) && 'Please fill name with only alphabets.'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'E.g. Noah May'} 
                        onChangeText={(text)=>{
                            setUser({
                                ...user,
                                Name:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Name==0){
                                setTemp({
                                    Name:temp.Name+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z]{1,40}( [a-zA-Z\']{1,40})$/;
                                setDisable({
                                    ...disable,
                                    Name:(!pattern.test(user.Name))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Email ID:</Text>
                    <Text style={styles.error}>{(disable.Email) && 'Invalid Email '}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'E.g.noahmay@gmail.com'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Email:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Email==0){
                                setTemp({
                                    Email:temp.Email+1
                                })
                            }
                            else{
                                const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                setDisable({
                                    ...disable,
                                    Email:(!pattern.test(user.Email))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Phone No:</Text>     
                    <Text style={styles.error}>{(disable.Phone) && 'Invalid Mobile No'}</Text>                   
                    <TextInput style={styles.field} 
                        placeholder={'E.g. 8976543209'} 
                        keyboardType={"numeric"} 
                        onChangeText={(text)=>{ 
                            setUser({
                                ...user,
                                Phone:text
                            });
                        }}
                        onBlur={(e)=>{
                            if(temp.Phone==0){
                                setTemp({
                                    Phone:temp.Phone+1
                                })
                            }
                            else{
                                const pattern = /^[6-9]\d{9}$/ 
                                user.Phone.trim();
                                setDisable({ 
                                    ...disable,
                                    Phone:(!pattern.test(user.Phone))
                                }); 
                            }
                        }}
                    />
                    <Text style={styles.title}>Company Name:</Text>
                    <Text style={styles.error}>{(disable.Address2) && 'Invalid Company Name'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'Street, Area'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                CompanyName:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.CompanyName==0){
                                setTemp({
                                    CompanyName:temp.CompanyName+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z0-9\s\-\.\''\,\()]+$/; 
                                setDisable({
                                    ...disable,
                                    CompanyName:(!pattern.test(user.CompanyName))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Address Line 1:</Text>
                    <Text style={styles.error}>{(disable.Address1) && 'Invalid Address'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'Flat No-Wing, Building Name'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Address1:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Address1==0){
                                setTemp({
                                    Address1:temp.Address1+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z0-9\s\-\.\''\,]+$/; 
                                setDisable({
                                    ...disable,
                                    Address1:(!pattern.test(user.Address1))
                                });
                            }    
                        }}
                    />
                    <Text style={styles.title}>Address Line 2:</Text>
                    <Text style={styles.error}>{(disable.Address2) && 'Invalid Address'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'Street/Lane, Area'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Address2:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Address2==0){
                                setTemp({
                                    Address2:temp.Address2+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z0-9\s\-\.\''\,\()]+$/; 
                                setDisable({
                                    ...disable,
                                    Address2:(!pattern.test(user.Address2))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Landmark:</Text>
                    <Text style={styles.error}>{(disable.Landmark) && 'Invalid Landmark'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'Optional'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Landmark:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Landmark==0){
                                setTemp({
                                    Landmark:temp.Landmark+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z0-9\s\-\.\''\,\()]+$/; 
                                setDisable({
                                    ...disable,
                                    Landmark:(!pattern.test(user.Landmark))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>City:</Text>
                    <Text style={styles.error}>{(disable.City) && 'Invalid City'}</Text>
                    <TextInput style={styles.field} 
                        placeholder={'E.g. Mumbai'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                City:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.City==0){
                                setTemp({
                                    City:temp.City+1
                                })
                            }
                            else{
                                const pattern = /^[a-zA-Z\s]{1,30}$/; 
                                setDisable({
                                    ...disable,
                                    City:(!pattern.test(user.City))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Pincode:</Text>
                    <Text style={styles.error}>{(disable.Pincode) && 'Invalid Pincode'}</Text> 
                    <TextInput style={styles.field} 
                        placeholder={'E.g. 123456'} 
                        keyboardType={"numeric"} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Pincode:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Pincode==0){
                                setTemp({
                                    Pincode:temp.Pincode+1
                                })
                            }
                            else{
                                const pattern = /^[1-9][0-9]{5}$/; 
                                setDisable({
                                    ...disable,
                                    Pincode:(!pattern.test(user.Pincode))
                                });
                            }
                        }}
                    />
                    
                    <Text style={styles.title}>Password:</Text>
                    <Text style={styles.error}>{(disable.Password) && 'Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character.'}</Text>
                    <TextInput style={styles.field} 
                        secureTextEntry={true}
                        placeholder={'Minimum 8 characters'} 
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Password:text
                            });
                        }} 
                        onBlur={(e)=>{
                            if(temp.Password==0){
                                setTemp({
                                    Password:temp.Password+1
                                })
                            }
                            else{
                                const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; 
                                setDisable({
                                    ...disable,
                                    Password:(!pattern.test(user.Password))
                                });
                            }
                        }}
                    />
                    <Text style={styles.title}>Confirm Password:</Text> 
                    <Text style={styles.error}>{(disable.Confirm)? 'Password does not match, Please Try Again!':null}</Text>
                    <TextInput style={styles.field} 
                        secureTextEntry={true}
                        placeholder={'Confirm your Password'}
                        onChangeText={(text) => {
                            setUser({
                                ...user,
                                Confirm:text
                            });
                        }} 
                    />
                </View>
                <View style={{alignItems:'center',flexDirection:'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.button}  
                        onPress={(e)=>{
                            if(user.Confirm!=user.Password){
                                setDisable({
                                    ...disable,
                                    Confirm:true
                                })
                            }
                            if(disable.Name==false && disable.Email==false && disable.Phone==false && disable.Address1==false && disable.Address2==false &&  disable.Pincode==false && disable.Password==false && disable.Confirm==false)
                            {

                                    if(Email.includes(user.Email)||Phone.includes(user.Phone))
                                    {
                                        Alert.alert("Error","Your email id or phone no is already registrated. Please login",[
                                            { text: "OK", onPress: () => {console.log("OK Pressed"); }}
                                        ])
                            
                                    }
                                    else
                                    {
                                        if( user.Name=='' || user.Phone=='' || user.Email=='' || user.Address1=='' || user.Address2=='' ||  user.Pincode=='' || user.Password=='')
                                        {
                                            Alert.alert("Error","Please fill the details properly",[
                                                { text: "OK", onPress: () =>{ console.log("OK Pressed");console.log(disable)}}
                                            ])
                                        }
                     
                                        else{
                                            firebase.database().ref('customers/').push(user); 
                                            reset();
                                            Alert.alert("Sign Up Sucessful","Please login in to your account",[
                                            { text: "OK", onPress: () => {console.log("OK Pressed"); }}
                                            ])
                         
                                         }
                                    }
                            }      
                            else{
                                Alert.alert("Error","Please fill the details properly",[
                                { text: "OK", onPress: () =>{ console.log("OK Pressed");console.log(disable)}}
                                ])
                                // e.target.reset()
                            }
                       }}
                          
                    >
                        <Text style={{fontSize:20,fontWeight:'bold'}} >Sign Up</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={(e)=> console.log(Phone) }> 
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Cancel</Text> 
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>  
    )
}
    

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent: 'center',
        backgroundColor:"grey"
    },
    header: {  
      backgroundColor:"pink",
      width:"100%",
      align:"center",
      padding:10,
    },
    title: {
      margin:10,
      fontSize:18,
      //paddingBottom:10,
      paddingLeft:10,
      fontWeight: 'bold',
    },
    field: {
      borderWidth:2,
      marginLeft:10,
      marginRight:10,
      borderColor:"white" ,
      height:30,
      fontSize:15,
      padding:10,
      borderRadius: 5,
      backgroundColor:"white"
    },
    error: {
        fontSize:15,
        color:"red",
        marginLeft:20,
    },
    button: {
        backgroundColor: 'pink',
        alignItems:'center',
        width: 170,
        borderRadius:5,
        padding:5,
        marginBottom:20,
    }
});