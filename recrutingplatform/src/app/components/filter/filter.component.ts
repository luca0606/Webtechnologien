import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() jobList: any[] = [];
  @Output() jobListFiltered: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor(private filterService: FilterService) { }

  savedFilters: any[] = [];

  filter = {
    title: '',
    requirement: '',
    location: '',
    salaryRange: '',
    vacancyActive: '',
    filterSelected: false
  };

  locations = []
  titles = []
  requirements = []
  localJobList: any[] = [];


  /**
   * This function filters the job list based on the filter object and emits the filtered list to the parent component
   * @returns void
   */
  applyFilters() {
    let filteredList = this.localJobList;

    if (this.filter.title) {
      filteredList = filteredList.filter(job => job.jobTitle.toLowerCase().includes(this.filter.title.toLowerCase()));
    }

    if (this.filter.requirement) {
      filteredList = filteredList.filter(job => job.jobRequirements.toLowerCase().includes(this.filter.requirement.toLowerCase()));
    }

    if (this.filter.location.length > 0) {
      filteredList = filteredList.filter(job => this.filter.location.includes(job.location));
    }

    if (this.filter.salaryRange) {
      let salaryMin = this.filter.salaryRange.split('-')[0];
      let salaryMax = this.filter.salaryRange.split('-')[1];
      filteredList = filteredList.filter(job => job.salaryRangeMax <= salaryMax && job.salaryRangeMin >= salaryMin);
    }

    this.jobListFiltered.emit(filteredList);
  }

  /**
   * This function resets the filter object and emits the unfiltered job list to the parent component
   * @returns void
   */
  resetFilters() {
    this.filter = {
      title: '',
      requirement: '',
      location: '',
      salaryRange: '',
      vacancyActive: '',
      filterSelected: this.filter.filterSelected,
    };
    this.jobList = this.localJobList;
    this.jobListFiltered.emit(this.jobList);
  }
  /**
   * This function creates arrays for the filter options
   * @returns void
   */
  createFilterArrays() {
    this.locations = Array.from(new Set(this.jobList.map(job => job.location)));
    this.titles = Array.from(new Set(this.jobList.map(job => job.jobTitle)));
    this.requirements = Array.from(new Set(this.jobList.map(job => job.jobRequirements)));
  }

  /**
   * This function creates a local job list
   * @returns void
   */
  createLocalJobList() {
    this.localJobList = this.jobList;
  }

  /**
   * @param filter 
   * This function saves a filter to the backend
   * @returns void
   */
  async saveFilter(filter: any) {
    let filterTest = { ...filter }


    if (filterTest._id) {
      filterTest.filterSelected = false;
      await this.filterService.updateFilter(filterTest);
    }
    //Save filter to backend

    const filterReturned = await this.filterService.addFilter(filterTest);
    filterReturned.filterSelected = true;
    this.selectFilter(filterReturned);
    this.savedFilters.push(filterReturned);

  }

  /**
   * @param filter 
   * This function selects a filter from the saved filters
   * @returns void
   */
  selectFilter(filter: any) {
    this.savedFilters.map(
      savedFilter => savedFilter._id === filter._id
        ? savedFilter.filterSelected = true
        : savedFilter.filterSelected = false
    );

    this.filter = filter;
  }

  /**
   * @param savedFilter 
   * This function applies a saved filter to the job list
   * @returns void
   */
  useSavedFilter(savedFilter: any) {
    this.filter = savedFilter;
    this.selectFilter(savedFilter);
    this.applyFilters();
  }

  /**
   * @param savedFilter 
   * This function deletes a saved filter
   * @returns void
   */
  deleteSavedFilter(savedFilter: any) {

    this.savedFilters = this.savedFilters.filter(filter => filter !== savedFilter);
    //Delete from backend
    this.filterService.deleteFilter(savedFilter);
  }

  /**
   * This function gets the filters from the backend
   * @returns void
   */
  getFilters() {
    this.filterService.getFilters().subscribe((res) => {
      this.savedFilters = res;
    });
  }

  //sort and emit jobs by title
  sortJobsByTitle() {
    this.jobList.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    this.jobListFiltered.emit(this.jobList);
  }
  //sort and emit jobs by location
  sortJobsByLocation() {
    this.jobList.sort((a, b) => a.location.localeCompare(b.location));
    this.jobListFiltered.emit(this.jobList);
  }

  //sort and emit jobs by salary
  sortJobsBySalary() {
    this.jobList.sort((a, b) => a.salaryRangeMin - b.salaryRangeMin);
    this.jobListFiltered.emit(this.jobList);
  }

  //sort and emit jobs by requirement
  sortJobsByRequirement() {
    this.jobList.sort((a, b) => a.jobRequirements.localeCompare(b.jobRequirements));
    this.jobListFiltered.emit(this.jobList);
  }

  ngOnInit() {
    this.jobList ? this.createFilterArrays() : "";
    this.jobList ? this.createLocalJobList() : "";

    this.getFilters();
  }
}
