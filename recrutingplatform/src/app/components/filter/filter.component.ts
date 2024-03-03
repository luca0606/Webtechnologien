import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() jobList: any[] = [];
  @Output() jobListFiltered: EventEmitter<any[]> = new EventEmitter<any[]>();

  filter = {
    jobTitles: '',
    jobRequirements: '',
    locations: [],
    salaryRangeMaxs: '',
    salaryRangeMins: '',
    vacancyActives: ''
  };
  applyFilters() {
    let filteredList = this.jobList;

    if (this.filter.jobTitles) {
      filteredList = filteredList.filter(job => job.jobTitle.toLowerCase().includes(this.filter.jobTitles.toLowerCase()));
    }

    if (this.filter.jobRequirements) {
      filteredList = filteredList.filter(job => job.jobRequirements.toLowerCase().includes(this.filter.jobRequirements.toLowerCase()));
    }

    // if (this.filter.locations) {
    //   console.log(this.filter.locations)
    //   // filteredList = filteredList.filter(job => job.location === this.filter.locations);
    // }

    if (this.filter.locations.length > 0) {
      filteredList = filteredList.filter(job => this.filter.locations.includes(job.location));
    }

    // if (this.filter.sala) {
    //   const salaryRange = this.filter.salary.split('-').map(Number);
    //   filteredList = filteredList.filter(job => job.salaryRangeMin >= salaryRange[0] && job.salaryRangeMax <= salaryRange[1]);
    // }

    this.jobListFiltered.emit(filteredList);
  }

  resetFilters() {
    this.filter = {
      jobTitles: '',
      jobRequirements: '',
      locations: [],
      salaryRangeMaxs: '',
      salaryRangeMins: '',
      vacancyActives: ''
    };
    this.jobListFiltered.emit(this.jobList);
  }

  createFilterArrays(jobList: any[]) {
    return jobList.reduce((filters, job) => {
      filters.jobTitles = filters.jobTitles.includes(job.jobTitle) ? filters.jobTitles : [...filters.jobTitles, job.jobTitle];
      filters.jobRequirements = filters.jobRequirements.includes(job.jobRequirements) ? filters.jobRequirements : [...filters.jobRequirements, job.jobRequirements];
      filters.locations = filters.locations.includes(job.location) ? filters.locations : [...filters.locations, job.location];
      filters.salaryRangeMaxs = filters.salaryRangeMaxs.includes(job.salaryRangeMax) ? filters.salaryRangeMaxs : [...filters.salaryRangeMaxs, job.salaryRangeMax];
      filters.salaryRangeMins = filters.salaryRangeMins.includes(job.salaryRangeMin) ? filters.salaryRangeMins : [...filters.salaryRangeMins, job.salaryRangeMin];
      filters.vacancyActives = filters.vacancyActives.includes(job.vacancyActive) ? filters.vacancyActives : [...filters.vacancyActives, job.vacancyActive];
      return filters;
    }, {
      jobTitles: [],
      jobRequirements: [],
      locations: [],
      salaryRangeMaxs: [],
      salaryRangeMins: [],
      vacancyActives: []
    });
  }


  ngOnChanges() {

    // console.log('FilterComponent: ngOnChanges', this.jobList);

    this.filter = this.jobList ? this.createFilterArrays(this.jobList) : this.filter;
    console.log(this.filter)
  }
}
