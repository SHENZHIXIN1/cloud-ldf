# TinyLDF

## Backend

### Features
- **Search for Quads**: The backend provides an API to search for quads based on `subject`, `predicate`, `object`, and `graph`. The API supports pagination using a `cursor` parameter.
- **Add Quads**: Users can add quads individually or upload them in bulk from a TTL file.
- **Authentication**: The backend uses **Google JWT authentication** to secure access. Only authorized users can search for or add quads.

### API Endpoints
- **GET /api/quads**: 
  - Search for quads.
  - Supports query parameters for `subject`, `predicate`, `object`, and `graph`.
  - Pagination is handled with the `cursor` parameter.
  
- **POST /api/quads**: 
  - Add a single quad (requires `subject`, `predicate`, `object`, `graph` fields).
  
- **POST /api/quads/upload**: 
  - Upload quads from a TTL file (requires JWT authentication).

## Frontend

### Features
- **Search for Quads**: Users can enter search parameters (subject, predicate, object, graph) and view matching quads in a paginated list.
- **Display Execution Time**: After performing a search, the frontend displays the time it took to fetch the results.
- **Pagination**: The frontend supports loading more results with a "Load More" button, using the `nextCursor` returned from the backend.

### Current Flow
1. **Search for Quads**:
   - Users can input search criteria (subject, predicate, object, graph) and click the "Search" button.
   - The frontend sends a request to the backend API with the query parameters.
   
2. **Displaying Results**:
   - The results are displayed in a list.
   - The time taken to execute the query is shown alongside the results.

3. **Load More**:
   - Users can click the "Load More" button to fetch additional results, using the `nextCursor` returned by the backend.

### Missing Feature: **Add Quads**
- The **"Add Quad"** feature has not yet been implemented in the frontend. Users cannot currently add new quads from the user interface.

## Members
- Emerik AJI
- Zhixin SHEN
- Moustapha DIOP
