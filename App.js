import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, Image,
  TouchableOpacity, Dimensions, Modal, TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Slider from '@react-native-community/slider';

function App() {
  const [photos, setPhotos] = useState({'1': [], '2': [], '3': []});
  const [isShowModal, setIsShowModal] = useState(false);
  const [isViewPhoto, setIsViewPhoto] = useState(false);
  const [photoClick, setPhotoClick] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const takePhoto = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      setIsShowModal(true);
      console.log(image);
      setSelectedImage(image);
    }).catch(err => console.log(err));
  }
  const selectGallery = () => {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      setIsShowModal(true);
      console.log(image);
      setSelectedImage(image);
    }).catch(err => console.log(err));
  }
  const addToPhotos = (star) => {
    let temp = photos;
    temp[star].push(selectedImage);
    setPhotos(Object.assign(photos, temp));
  }
  const PhotoViewFull = ({image}) => (
    <Modal visible = {isViewPhoto} animationType='slide'>
      <SafeAreaView style = {{flex: 1}}>
        <View style = {{height: 45, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress = {() => setIsViewPhoto(false)}>
            <Text style = {{fontSize: 17, color: 'blue', marginRight: 10}}>Exit view</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style = {{flex: 1, backgroundColor: '#c4c4c4'}}>
          {image ? <Image style = {{flex: 1}} source = {{uri: image.path}} resizeMode='contain'/> : null}
        </View>
      </SafeAreaView>
    </Modal>
  )
  const MakeStar = () => {
    const [coolness, setCoolness] = useState(1);
    return(
      <Modal visible = {isShowModal} animationType='fade' transparent = {true}>
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {styles.modal}>
            <Text style = {{textAlign: 'center'}}>Please select coolness of this picture.</Text>
            <Text style = {{textAlign: 'center', fontSize: 19}}>{coolness}</Text>
            <View style = {{flex: 1}}>
              <Slider minimumValue = {1} maximumValue = {3} step = {1} value = {coolness}
              onValueChange = {value => setCoolness(value)}/>
            </View>
            <TouchableOpacity style = {styles.btnSetCoolness} onPress = {() => {
              setIsShowModal(false);
              setCoolness(1);
              addToPhotos(coolness + '')
              }}>
              <Text style = {{padding: 5, fontWeight: '600', color: '#ffffff'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return(
    <SafeAreaView style = {styles.container}>
      <MakeStar/>
      <PhotoViewFull image = {photoClick}/>
      <ScrollView style = {styles.container}>
        <View>
          <Text style = {styles.title}>3 stars</Text>
          <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
            {
              photos['3'].map((image, key) => (
                <TouchableWithoutFeedback key = {key} onPress = {() => {
                  setPhotoClick(image)
                  setIsViewPhoto(true);
                  }}>
                  <Image source = {{uri: image.path}} style = {styles.image} resizeMode='cover'/>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </View>
        <View>
          <Text style = {styles.title}>2 stars</Text>
          <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
            {
              photos['2'].map((image, key) => (
                <TouchableWithoutFeedback key = {key} onPress = {() => {
                  setPhotoClick(image)
                  setIsViewPhoto(true);
                  }}>
                  <Image source = {{uri: image.path}} style = {styles.image} resizeMode='cover'/>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </View>
        <View>
          <Text style = {styles.title}>1 star</Text>
          <View style = {{flexWrap: 'wrap', flexDirection: 'row'}}>
            {
              photos['1'].map((image, key) => (
                <TouchableWithoutFeedback key = {key} onPress = {() => {
                  setPhotoClick(image)
                  setIsViewPhoto(true);
                  }}>
                  <Image source = {{uri: image.path}} style = {styles.image} resizeMode='cover'/>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </View>
      </ScrollView>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20}}>
        <TouchableOpacity style = {styles.button} onPress = {takePhoto}>
          <Text style = {styles.title}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button} onPress = {selectGallery}>
          <Text style = {styles.title}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    backgroundColor: 'gray', padding: 5, fontWeight: '600', color: '#ffffff'
  },
  button: {
    backgroundColor: 'gray', borderRadius: 10, width: (Dimensions.get('screen').width / 2) - 30,
    justifyContent: 'center', alignItems: 'center', height: 45
  },
  modal: {
    backgroundColor: '#8ab6d6', width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').height / 4,
    padding: 20, borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  btnSetCoolness: {
    backgroundColor: '#04009a', borderRadius: 10, width: (Dimensions.get('screen').width / 2) - 30,
    justifyContent: 'center', alignItems: 'center', height: 45, alignSelf: 'center'
  },
  image: {
    width: 100, height: 100
  }
});

export default App;
