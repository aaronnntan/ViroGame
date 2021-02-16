'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,

} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      count: 0,
      position: [0, -.5, -1]
    };

    // bind 'this' to functions
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
      <ViroText text= {String(this.state.count)} scale={[.5, .5, .5]} position={[0, 0, -1]} outerStroke={{type:"Outline", width:8, color:'#FF0000'}} extrusionDepth={5} style={styles.helloWorldTextStyle} />
      <Viro3DObject
            source={require('./res/tesla/object_car.obj')}
            resources={[require('./res/tesla/object_car.mtl'),
                        ]}
            // take note, the mtl file is not a material, contains instructions for texture application, use materials and call create materials function
            position={this.state.position}
            highAccuracyEvents={true}
            scale={[.2, .2, .2]}
            onClick={this._onClick}
            materials="white"
            onLoadStart={this._onLoadStart}
            animation={{name:'loopRotate',
                run:true,
                loop:true}}
            type="OBJ" />
      
      <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
      
      </ViroARScene>

      );
    }



    _onClick(source) {
      // assigning random x and y values and updating counter
      this.setState({
        count:  this.state.count + 1,
        position: [Math.random(), -.5, Math.random()] 
      });

    }


  }

  var styles = StyleSheet.create({
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 40,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',  
    },
  });

  ViroMaterials.createMaterials({
      white: {
    lightingModel: "PBR",
    diffuseTexture: require('./res/tesla/object_car_main_Base_Color.png'),
    metalnessTexture: require('./res/tesla/object_car_main_Metallic.png'),
    roughnessTexture: require('./res/tesla/object_car_main_Roughness.png'),
  },
  });

  ViroAnimations.registerAnimations({
    loopRotate:{properties:{rotateY:"+=45"}, duration:1000},
  });

  module.exports = HelloWorldSceneAR;
