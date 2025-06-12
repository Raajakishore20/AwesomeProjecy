import React from 'react';
import type {ReactNode} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import './shim.js';

// @ts-ignore
import SmartHomeSDK from '@rentlydev/smarthome-sdk';

const getPropertyLevelTokenApi = async ({propertyId, agentToken} :any) => {

  console.log('getPropertyLevelTokenApi called with propertyId: ', propertyId, ' and agentToken: ', agentToken);

  const url = `https://app2.keyless.rocks/api/properties/${propertyId}/token`;


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agentToken}`,
      },
      //body: JSON.stringify(params),
    });

    console.log('Response status: ', response);

    if (!response.ok) {
      throw new Error();
    }

    const accessTokenData = await response.json();
    return Promise.resolve(accessTokenData);

  } catch (error : any) {

    if(error){
      console.log("Error in fetching property token", error);
      return Promise.reject(error);
    }

  }
};

const getAgentTokenApi = async ({username, password}: any) => {

  console.log('getAgentTokenApi called with username: ', username, ' and password: ', password);
  const url = `https://app2.keyless.rocks/api/agents`;

  const params = {
    username: username,
    password: password,
     grant_type: 'password',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error();
    }

    const accessTokenData = await response.json();
    return Promise.resolve(accessTokenData);
  } catch (error: any) {
    if (error) {
      console.log('Error in fetching agent token', error);
      return Promise.reject(error);
    }
  }
};


const App: () => ReactNode = () => {

  //const clientId = "xYu8CZHJRHxCiTmz6gsVCo-FnzKPg5EcE89eWwxjzMc";
  //const clientSecret = "OO7I1CyQI1N9DLNpkrKQGgYBofpXLZaeDi5r79LbXLk";
  const username = 'rakesh+inst@rently.com';
  const password = 'Rakesh88';
  const propertyId = 231251;

  const getAccessToken = async () =>{
    const {access_token} = await getAgentTokenApi({username, password});
    console.log('Agent Token: ', access_token);
    return await getPropertyLevelTokenApi({propertyId, agentToken: access_token});
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, backgroundColor: "#F3FAFF" }} >
       <SmartHomeSDK 
          getAccessToken = {getAccessToken}
          propertyId  = { propertyId }
        /> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
