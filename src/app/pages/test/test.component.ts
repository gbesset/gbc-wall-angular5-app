import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers , URLSearchParams } from '@angular/http';

//pour les promises
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent  {

    apiRoot: string = "http://httpbin.org";

    constructor(private http: Http) { }

    doGET() {
        console.log("GET");
        let url = `${this.apiRoot}/get`;
        //return a json formated string.        text
        //this.http.get(url).subscribe(res => console.log(res.text()));

        //return an object.    json
        //this.http.get(url).subscribe(res => console.log(res.json()));

        //search. requete ffera un      get?foo=moo@limit=25
        let search = new URLSearchParams();
        search.set('foo','moo');
        search.set('limit', "25");
        this.http.get(url,{search: search}).subscribe(res => console.log(res.json()));

    }

    doPOST() {
        console.log("POST");
        let url = `${this.apiRoot}/post`;
        //this.http.post(url,{moo:"foo", goo:"loo"}).subscribe(res => console.log(res.json()));

        //avec des params
        let params = new URLSearchParams();
        params.set('foo','moo');
        params.set('limit', "25");
        this.http.post(url,{moo:"foo", goo:"loo"}, {params}).subscribe(res => console.log(res.json()));
    }

    doPUT() {
        console.log("PUT");
        let url = `${this.apiRoot}/put`;
        this.http.put(url,{moo:"foo", goo:"loo"}).subscribe(res => console.log(res.json()));

        //idem avec params
        //...
    }

    doDELETE() {
        console.log("DELETE");
        let url = `${this.apiRoot}/delete`;

        let search = new URLSearchParams();
        search.set('foo','moo');
        search.set('limit', "25");
        this.http.delete(url,{search}).subscribe(res => console.log(res.json()));
    }

    doGETAsPromise() {
        console.log("GET AS PROMISE");
        let url = `${this.apiRoot}/get`;
        let search = new URLSearchParams();
        search.set('foo','moo');
        search.set('limit', "25");

        this.http.get(url,{search: search})
            .toPromise()
            .then(res => console.log(res.json()));
    }

    doGETAsPromiseError() {
        console.log("GET AS PROMISE ERROR");
        let url = `${this.apiRoot}/post`;   //server will returnn an error
        let search = new URLSearchParams();
        search.set('foo','moo');
        search.set('limit', "25");

        this.http.get(url,{search: search})
            .toPromise()
            .then(res => console.log(res.json()))
            .catch( msg => console.log(`Error during request: status(${msg.status}) text(${msg.statusText})`)
            );
    }

    doGETAsObservableError() {
        console.log("GET AS OBSERVABLE ERROR");
        let url = `${this.apiRoot}/post`;   //server will returnn an error
        let search = new URLSearchParams();
        search.set('foo','moo');
        search.set('limit', "25");

        this.http.get(url,{search: search})
            .subscribe(
                res => console.log(res.json()),
                msg => console.log(`Error during request: status(${msg.status}) text(${msg.statusText})`)
            );
    }

    doGETWithHeaders() {
        console.log("GET WITH HEADERS");
        let headers = new Headers();
        headers.append('Authorization', btoa('username:password'));
        let opts = new RequestOptions();
        opts.headers = headers;
        let url = `${this.apiRoot}/get`;
        this.http.get(url, opts).subscribe(
            res => console.log(res.json()),
            msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
        );
    }
}


//https://httpstatuses.com/
//j'en suis la
//https://codecraft.tv/courses/angular/http/core-http-api/