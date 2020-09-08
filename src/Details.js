import React, { Component } from 'react';
import { TextInput ,View,Text} from 'react-native';


export default class Details extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        const title=this.props.route.params.title,
        url=this.props.route.params.url,
        created_at=this.props.route.params.created_at,
        author=this.props.route.params.author
        return(
            <View style={{width:'100%',marginTop:40,alignItems:'center'}}>
            <View
                style={{width:'98%',height:'auto',borderWidth:0.1,padding:10,elevation:5}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Title:-</Text>
                <Text style={{fontSize:12,padding:10}}>{title}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Url:-</Text>
                <Text style={{fontSize:12,padding:10}}>{url}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Created_at:-</Text>
                <Text style={{fontSize:12,padding:10}}>{created_at}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Author:-</Text>
                <Text style={{fontSize:12,padding:10}}>{author}</Text>
                </View>
                
                </View>
                </View>
        )
    }
}