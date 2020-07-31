## Contributing a new feature

1. ___Add a feature request.___  

    https://gitlab.gov.ab.ca/dio/core/ui-components/-/issues  
      
    Take a second to search the existing components and feature requests to see if this feature is already implemented or requested, use the label _feature_ to search.  Add a feature request, use the label _Feature_.  Once the feature request is created someone on the component team will create a backlog item.  

2. ___Create a branch for your work.___  

    Follow pattern: _feature-request/MY_FEATURE_ and be sure to link it to the feature request.  

3. ___Create your component or alter existing component.___  
  
    Before starting review the [coding standards](coding_standards.md).  

    Required elements:  
    - Component.  
The component should have be generic enough to have value to other teams with an appropriate level of customization offered.  

    - Unit Tests.  
Use your judgement, but aim to test each configurable input/output of the component.  We have been using testing-library to provide a consistent test authoring experience across all library types, but if it is not sufficient feel free to use a different one.  

    - Storybook documentation. 
Add a stories.mdx file to add the new component to the storybook.  Make sure to include documentation for the inputs/outputs of the component; documentation might vary depending on library type (Angular, Vue, React...).  
        
  
4. ___Mark the feature request as ready.___
  
    Using a comment on the feature request, notify the component team that the feature is ready to be integrated.  The backlog item created for the feature request will be prioritized and pulled into a sprint.
  
5. ___Review the feature.___  

    The component team will review, test, and make any necessary changes to the feature and merge it into the _@next_ branch.   The feature will be available in the _@next_ label in the NPM package.  Review the changes and reopen the issue if needed.  After a sufficient incubation period all features in the _@next_ package will be promoted to _@latest_ and available in the default NPM package.
