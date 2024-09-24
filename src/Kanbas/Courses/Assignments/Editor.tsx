export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" >
        <h3 style={{ fontWeight: 'bold' }}>Assignment Name</h3>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page. 
        </textarea> <br/><br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} /><br /><br />
            </td>
          </tr>

            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-group">Assignment Group</label>
                </td>
                <td>
                    <select id="wd-group">
                        <option value="assignments">ASSIGNMENTS</option>
                    </select> 
                    <br /><br />
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </td>
                <td>
                    <select id="wd-display-grade-as">
                        <option value="percentage">Percentage</option>
                    </select>
                    <br /><br />
                </td>
            </tr>

            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </td>
                <td>
                    <select id="wd-submission-type">
                        <option value="online">Online</option>
                    </select>
                    <br /><br />
                </td>
            </tr>

            <tr>
                    <td></td>
                    <td>
                        <div>
                            <label>Online Entry Options</label><br />
                            <input type="checkbox" id="wd-text-entry" />
                            <label htmlFor="wd-text-entry">Text Entry</label><br />
                            
                            <input type="checkbox" id="wd-website-url" />
                            <label htmlFor="wd-website-url">Website URL</label><br />
                            
                            <input type="checkbox" id="wd-media-recordings" />
                            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                            
                            <input type="checkbox" id="wd-student-annotation" />
                            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                            
                            <input type="checkbox" id="wd-file-upload" />
                            <label htmlFor="wd-file-upload">File Uploads</label>
                            <br /><br />
                        </div>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to" style={{ display: 'block' }}>Assign to</label>
                        <input id="wd-assign-to" value="Everyone"/>
                        <br /><br />
                    </td>
                </tr>

                <tr>
                    <td></td> {}
                    <td>
                        <label htmlFor="wd-due-date">Due</label>
                        <input type="date" id="wd-due-date" value="2024-05-13" style={{ display: 'block'}} />
                        <br/>
                    </td>
                </tr>

                <tr>
                    <td></td> {}
                    <td style={{ padding: '0', position: 'relative' }}>
                        <label htmlFor="wd-available-from">Available from</label>
                        <label htmlFor="wd-available-until" style={{ position: 'absolute', left: '125px' }}>Until</label>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="date" id="wd-available-from" value="2024-05-06" style={{ marginRight: '5px', marginBottom: '0' }} />
                        <input type="date" id="wd-available-until" value="2024-05-20" style={{ marginBottom: '15px' }} />
                    </td>
                </tr>

        </table>

        <hr></hr>

        <td style={{ padding: '0', display: 'flex', justifyContent: 'flex-end' }}>
    <button type="button" style={{ marginRight: '5px' }}>Cancel</button>
    <button type="submit">Save</button>
</td>

      </div>
  );}