import React, { Component } from 'react';
import { TextInput ,View,Text,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native';


export default class Nasa extends Component{
    constructor(){
        super();
        this.state={
            news:'',
            dataSource:[],
            page:0,
            loading:true
        }
    }
    ApiCall(){
        const { page,dataSource} = this.state;
        //fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}")
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: page === 1 ? responseJson.hits : [...dataSource, ...responseJson.hits]
          })
          console.log("responseJson",JSON.stringify(responseJson))
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.ApiCall()
        }, 1000);
        }

        handleRefresh = () => {
            this.setState({
                loading: true
            }, () =>{
                this.ApiCall();
            });
        }

        handleLoadMore = () => {
            this.setState({
                page: this.state.page + 1
            }, () =>{
                this.ApiCall();
            });
        }

        indicator(){
            return(
                <View
                style={{
                    paddingVertical: 30,
                    // borderTopWidth: 1,
                    // borderColor: "#00ff00"
                }}
            >
            <ActivityIndicator size="large" color="#00ff00" />
      
               {/* <ActivityIndicator  size="large" animating={this.state.loading} /> */}
            </View>
            )
      
        }

        renderItem(data){
            console.log("data==>",JSON.stringify(data))
            return(
                <View style={{width:'100%',marginTop:20,alignItems:'center'}}>
                <TouchableOpacity 
                
                onPress={()=>this.props.navigation.navigate('Details',{title:data.item.title,
                                                url:data.item.url,
                                                created_at:data.item.created_at,
                                                author:data.item.author})}
                style={{width:'98%',height:'auto',borderWidth:0.1,padding:10,elevation:5}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Title:-</Text>
                <Text style={{fontSize:12,padding:10}}>{data.item.title}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Url:-</Text>
                <Text style={{fontSize:12,padding:10}}>{data.item.url}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Created_at:-</Text>
                <Text style={{fontSize:12,padding:10}}>{data.item.created_at}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>Author:-</Text>
                <Text style={{fontSize:12,padding:10}}>{data.item.author}</Text>
                </View>
                
                </TouchableOpacity>
                </View>
            )
        }

    render(){
        return(
                <View style={{marginTop:40,}}>
                {/* <View style={{alignItems:'center'}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:'70%',borderRadius:22,
                    height:45,padding:10 }}
                    placeholder={'title,URL and author'}
                    onChangeText={news => this.setState({news})}
                    value={this.state.news}
                    />
                    <TouchableOpacity style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'60%',borderRadius:22,
                    height:45,padding:10,backgroundColor:'green',marginTop:20}}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>Search</Text>
                    </TouchableOpacity>
                    </View> */}

                    <View style={{marginTop:10}}>
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.id}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0}
                        refreshing={this.state.loading}
                        ListFooterComponent={this.indicator()}
                    />
                    </View>
                </View>
        )
    }
}