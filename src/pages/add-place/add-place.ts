import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';
import {PlacesService} from "../../services/places";

declare var cordova : any;

@IonicPage()
@Component({
    selector: 'page-add-place',
    templateUrl: 'add-place.html',
})
export class AddPlacePage {

    location : Location = {
        lat : 40.7624324,
        lng : -73.9759827
    };

    locationIsSet = false;
    imageUrl : string = '';

    constructor(public modalCtrl : ModalController, private geolocation: Geolocation, private camera: Camera,
                public loadingCtrl : LoadingController, public toastCtrl : ToastController,
                public placesService : PlacesService, private file : File){}

    onSubmit(form : NgForm){
        this.placesService.addPlace(
            form.value.title,
            form.value.description,
            this.location,
            this.imageUrl
        );
        form.reset();
        this.location = {
            lat : 40.7624324,
            lng : -73.9759827
        };
        this.locationIsSet = false;
        this.imageUrl = '';
    }

    onLocate(){
        const loading = this.loadingCtrl.create({
            content : "Getting your location..."
        });
        loading.present();
        this.geolocation.getCurrentPosition()
            .then(location => {
                loading.dismiss();
                this.location.lat = location.coords.latitude;
                this.location.lng = location.coords.longitude;
                this.locationIsSet = true;
            })
            .catch(error => {
                loading.dismiss();
                const toast = this.toastCtrl.create({
                    message : "Could get location, please pick it manually!",
                    duration : 2500
                });
                toast.present();
            });
    }
    onOpenMap(){
        const modal = this.modalCtrl.create(SetLocationPage, { location : this.location, isSet : this.locationIsSet });
        modal.present();
        modal.onDidDismiss(data => {
            if(data){
                this.location = data.location;
                this.locationIsSet = true;
            }
        });
    }

    onTakePhoto() {
        this.camera.getPicture({
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        })
            .then(
                imageData => {
                    const currentName = imageData.replace(/^.*[\\\/]/, '');
                    const path = imageData.replace(/[^\/]*$/, '');
                    const newFileName = new Date().getUTCMilliseconds() + '.jpg';
                    this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                        .then(
                            (data: Entry) => {
                                this.imageUrl = data.nativeURL;
                                this.camera.cleanup();
                                // File.removeFile(path, currentName);
                            }
                        )
                        .catch(
                            (err: FileError) => {
                                this.imageUrl = '';
                                const toast = this.toastCtrl.create({
                                    message: 'Could not save the image. Please try again',
                                    duration: 2500
                                });
                                toast.present();
                                this.camera.cleanup();
                            }
                        );
                    this.imageUrl = imageData;
                }
            )
            .catch(
                err => {
                    const toast = this.toastCtrl.create({
                        message: 'Could not take the image. Please try again',
                        duration: 2500
                    });
                    toast.present();
                }
            );
    }

}
