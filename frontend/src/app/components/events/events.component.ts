import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ProjectService } from "src/app/Service/project.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  //Closing Dailog
  @ViewChild("closeBtn") closeBtn: ElementRef;
  @ViewChild("datatable") datatable: ElementRef;

  data = [];

  eventForm: FormGroup;

  constructor(private service: ProjectService) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      datetime: new FormControl("", [Validators.required])
    });
    this.getEvents();
  }

  getSingleEvent(param) {
    console.log(param);
  }

  getEvents() {
    let arr = new Array();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    headers = headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    const body = {
      query: "query{events{_id title description price date}}"
    };
    this.service.getEvents(body, headers).subscribe(events => {
      arr.push(events);

      this.data = arr[0].data.events;
      console.log(this.data);
    });
  }

  onSubmit() {
    let mydate = new Date(this.eventForm.value.datetime).toDateString();

    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    };

    const body = {
      query: `mutation{createEvents(eventInput:{title:"${
        this.eventForm.value.title
      }",description:"${this.eventForm.value.description}",price:${+this
        .eventForm.value
        .price},date:"${mydate}"}){title description price date}}`
    };

    this.service.createEvent(body, header).subscribe(event => {
      console.log(event);
      alert("Successfully Added");
      this.data.push(event);
      this.closeModal();
      this.datatable.nativeElement.refesh();
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  refreshTable() {
    this.datatable.nativeElement.refesh();
  }
}
