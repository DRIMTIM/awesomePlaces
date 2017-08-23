/**
 * Created by pelupotter on 21/08/17.
 */
import { Location } from './location';

export class Place {

    constructor(
        public title : string,
        public description : string,
        public location : Location,
        public imageUrl : string
    ){}

}
