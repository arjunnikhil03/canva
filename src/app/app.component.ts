import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { SRect } from "../lib/rect";
import { SText } from "../lib/text";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'canva';
  svg: any;
  isChecked: boolean = false;

  ngOnInit() {
    var that = this;
    this.svg = d3.select("#drawing")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "500");
  }

  constructor() {
    //this.rect = new Rect(this.svg);
  }

  dragstarted(event: any) {
    console.log("start");
    console.log(event);
    d3.select("rect").style("stroke", "black");
  }

  dragged(event: any, d: any) {
    console.log(d)
    console.log(event)
    d3.select("rect").raise().attr("x", event.x).attr("y", event.y);
  }

  onInitialize(element: any) {
    //console.log(element);
    //this.svgObj = element;
  }

  addRect() {
    let drag_behavior = d3.drag()
      .on("start", this.dragstarted)
      .on("drag", this.dragged);
    this.svg.append("rect")
      //.attr("id", "rect-unique")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 200)
      .attr("height", 100)
      .attr("fill", "blue")
      .call(drag_behavior);

  }

  addCircle() {
    this.svg.append("circle")
      .attr("cx", 250)
      .attr("cy", 50)
      .attr("r", 30)
      .attr("fill", "pink")
  }

  addSquare() {
    let rect = new SRect(this.svg);
    let props = rect.getDefaultProps();
    rect.shape(props);
  }

  addText(event: any) {
    console.log(this.isChecked);
    let text = new SText(this.svg);
    let props = text.getDefaultProps();
    text.shape(props);
  }

  onSubmit() {
    console.log('hello')
  }

}
