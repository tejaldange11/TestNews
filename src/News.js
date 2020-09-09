import React, { Component } from 'react';
import { TextInput ,View,Text,TouchableOpacity,FlatList, ActivityIndicator,ScrollView} from 'react-native';


export default class Nasa extends Component{
    constructor(){
        super();
        this.state={
            news:'',
            dataSource:[],
            page:0,
            loading:true,
            searchData:true, 
            filterData:true,
            date:true,                                                                                                                          

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

        search(){
            const data=this.state.dataSource
    
            for(let i=0;i<data.length;i++){
              if(data[i].url !== null && data[i].url !== undefined && data[i].url !== ""){
                if(data[i].author.includes(this.state.news.toLowerCase())  ||data[i].title.includes(this.state.news)
                                || data[i].url.includes(this.state.news)
                            )
        
                    return(
                        <View>
                        <View  style={{width:'98%',height:'auto',borderWidth:0.1,padding:10,elevation:5,marginTop:20}}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>created_at:-</Text>
                        <Text style={{fontSize:12,padding:10}}>{data[i].created_at}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>url:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].url}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>title:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].title}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>author:-</Text>
                            <Text style={{fontSize:12,padding:10}}>{data[i].author}</Text>
                            </View>
                            </View>
                        </View>
                    )
            }}
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

        filterPostByTitle(){
            const data=this.state.dataSource
            const test='TeJal'
            console.log("**************",test.toLowerCase())
            data.sort((a,b)=>(a.title.toLowerCase() > b.title.toLowerCase()) ? 1: -1)
            {
                console.log("**************",JSON.stringify(data))
    
                return (
                    <View style={{alignItems: 'center',}}>
                        <ScrollView style={{}}>
    
                        {data.map((records)=>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Details', {
                                        created_at: records.created_at,
                                        title: records.title,
                                        author: records.author,
                                        url: records.url
                                    })}
                                style={{
                                    borderColor: 'gray', borderWidth: 1,width:'100%',borderRadius:22,
                                      height:'auto',padding:10,marginTop:20
                                }}>
    
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>created_at:-</Text>
                                    <Text style={{fontSize:12,padding:10}}>{records.created_at}</Text>
                                </View>
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>url:-</Text>
                                    <Text style={{fontSize:12,padding:10}}>{records.url}</Text>
                                </View>
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>title:-</Text>
                                    <Text style={{fontSize:12,padding:10}}>{records.title}</Text>
                                </View>
                                <View style={{flexDirection: 'row',}}>
                                    <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>author:-</Text>
                                    <Text style={{fontSize:12,padding:10}}>{records.author}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        </ScrollView>
    
                    </View>
    
                )
            }
    
    
        }
    
        filterPostByDate(){
            const data=this.state.dataSource
            data.sort((a,b)=>(a.created_at > b.created_at) ? 1: -1)
            {
                return (
                        <View style={{alignItems: 'center',}}>
                            <ScrollView style={{}}>
                            {data.map((records)=>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Details', {
                                    created_at: records.created_at,
                                    title: records.title,
                                    author: records.author,
                                    url: records.url
                                })}
                            style={{
                                 borderWidth: 0.1,width:'100%',
                                      height:'auto',padding:10,marginTop:20,elevation:5
                            }}>
    
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>created_at:-</Text>
                                <Text style={{fontSize:12,padding:10}}>{records.created_at}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>url:-</Text>
                                <Text style={{fontSize:12,padding:10}}>{records.url}</Text>
                            </View>
                            <View style={{flexDirection: 'row',}}>
                                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>title:-</Text>
                                <Text style={{fontSize:12,padding:10}}>{records.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:15}}>
                                <Text style={{fontWeight:'bold',fontSize:12,padding:10}}>author:-</Text>
                                <Text style={{fontSize:12,padding:10}}>{records.author}</Text>
                            </View>
                        </TouchableOpacity>
                        )}
                            </ScrollView>
                    </View>
    
                )
            }
    
    
        }


    render(){
        return(
                <View style={{marginTop:20,}}>
                <View style={{alignItems:'center',flexDirection:'row'}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:'50%',borderRadius:22,
                    height:45,padding:10,marginLeft:20 }}
                    placeholder={'title,URL and author'}
                    onChangeText={news => this.setState({news})}
                    value={this.state.news}
                    />
                    <TouchableOpacity 
                    onPress={()=>
                                  this.setState({searchData:false,filterData:true})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'30%',borderRadius:22,
                    height:45,padding:10,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>Search</Text>
                    </TouchableOpacity>

                    </View>
                    <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
                    <TouchableOpacity 
                    onPress={()=>
                                  this.setState({searchData:false,filterData:false,date:true})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'40%',borderRadius:22,
                    height:45,padding:10,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:14,fontWeight:'bold',alignSelf:'center'}}>Filter by date</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>
                                  this.setState({searchData:false,filterData:false,date:false})}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1,width:'40%',borderRadius:22,
                    height:45,padding:10,backgroundColor:'green',marginLeft:10}}>
                    <Text style={{color:'#fff',fontSize:14,fontWeight:'bold',alignSelf:'center'}}>Filter by title</Text>
                    </TouchableOpacity>

                    </View>

                    <View style={{marginTop:10}}>
                     { this.state.searchData ?
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
                    :
                    this.state.filterData ?
                        this.search()
                          
                           :
                            this.state.date ?
                                
                            this.filterPostByDate()
                                   
                                    :
                                    this.filterPostByTitle()

                     
                      
                     }

                    </View>
                </View>
        )
    }
}