import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places";

@IonicPage()
@Component({
    selector: 'page-place',
    templateUrl: 'place.html',
})
export class PlacePage {

    place : Place;
    index : number;

    constructor(public viewCtrl : ViewController, public navParams: NavParams,
                public placesService : PlacesService) {
        this.place = this.navParams.get('place');
        this.index = this.navParams.get('index');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlacePage');
    }

    onLeave(){
        this.viewCtrl.dismiss();
    }

    onDelete(){
        this.placesService.deletePlace(this.index);
        this.onLeave();
    }

}
