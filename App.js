import React, { Component } from 'react';
import { TextInput ,View,Text} from 'react-native';
import Navigation from './src/Navigation'

export default class App extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
                <Navigation />
        )
    }
}