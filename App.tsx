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

const getPropertyLevelTokenApi = async ({propertyId, clientId, clientSecret, setAccessToken} :any) => {
  const url = `https://app2.keyless.rocks/api/properties/${propertyId}/token`;

  const params = {
    client_id: clientId,
    client_secret: clientSecret,
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

  } catch (error : any) {

    if(error){
      console.log("Error in fetching property token", error);   
      return Promise.reject(error); 
    }

  }
}


const App: () => ReactNode = () => {
  
  const clientId = "xYu8CZHJRHxCiTmz6gsVCo-FnzKPg5EcE89eWwxjzMc";
  const clientSecret = "OO7I1CyQI1N9DLNpkrKQGgYBofpXLZaeDi5r79LbXLk";
  const propertyId = 223439;

  const getAccessToken = async () =>{
   return await getPropertyLevelTokenApi( { clientId, clientSecret, propertyId } );            
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
