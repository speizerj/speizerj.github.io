(function() {
  'use strict';

  angular
    .module("app.utils")
    .factory("stateService", stateService);

  /**
   * @ngdoc service
   * @name stateService
   * @description  Factory for holding our state codes
   * @example 
   * var code = stateService.code['California']; // 'CA'
   */
  function stateService() {
    return {
      code: {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas':  'AR',
        'California':  'CA',
        'Colorado':  'CO',
        'Connecticut': 'CT',
        'Delaware':  'DE',
        'District of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam':  'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa':  'IA',
        'Kansas':  'KS',
        'Kentucky':  'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland':  'MD',
        'Marshall Islands':  'MH',
        'Massachusetts': 'MA',
        'Michigan':  'MI',
        'Micronesia': 'FM',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri':  'MO',
        'Montana': 'MT',
        'Nebraska':  'NE',
        'Nevada':  'NV',
        'New Hampshire': 'NH',
        'New Jersey':  'NJ',
        'New Mexico':  'NM',
        'New York':  'NY',
        'North Carolina': 'NC',
        'North Dakota':  'ND',
        'Northern Marianas' :  'MP',
        'Ohio' : 'OH',
        'Oklahoma':  'OK',
        'Oregon':  'OR',
        'Palau':   'PW',
        'Pennsylvania':  'PA',
        'Puerto Rico': 'PR',
        'Rhode Island':  'RI',
        'South Carolina':  'SC',
        'South Dakota':  'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah':  'UT',
        'Vermont': 'VT',
        'Virginia':  'VA',
        'Virgin Islands':  'VI',
        'Washington':  'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
      }
    };

  }


})();
