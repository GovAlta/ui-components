## Contributing a new feature

1. ___Add a feature request.___  

    https://gitlab.gov.ab.ca/dio/core/ui-components/-/issues  
    Add a feature, be sure to include details for your branch.   
    Once the feature request is created someone on the component team will create a backlog item and prioritize it to be pulled into a sprint.  

2. ___Create a branch for your work.___  

    Follow pattern: feature-request/MY_FEATURE and be sure to link it to the feature request.  

3. ___Create your component or alter existing component.___  
  
    Before starting review the [coding standards](coding_standards.md).  

    Required elements:  
    - Component.  
The component should have be generic enough to have value to other teams with an appropriate level of customization offered.  

    - Unit Tests.  
Use your judgement, but aim to test each configurable input/output of the component.  We have been using testing-library to provide a consistent test authoring experience across all library types, but if it is not sufficient feel free to use a different one.  

    - Storybook documentation. 
Add a stories.mdx file to add the new component to the storybook.  Make sure to include documentation for the inputs/outputs of the component; documentation might vary depending on library type (Angular, Vue, React...).  
        
  
4. ___Review the feature.___  

    Once the story has been pulled and implemented, the feature request will be closed.  The feature will be available in the @next label in the NPM package.  Review the changes and reopen the issue if needed.  