
import React from 'react';
import {Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import {Icon} from "react-font-awesome-5";
import {HasPermission} from 'atp-uac';
import Details from "../containers/content/details";
import dateFormat from 'dateformat';
import {sortBy} from 'atp-pointfree';

export default ({content, toggle, isSelected, selectedContentId, onNewContent}) => <Row>
    <Col xs={12} sm={4} md={3} lg={2}>
        {content
            ? <ListGroup>
                <HasPermission permissions={["cms.content.create"]}>
                    <ListGroupItem style={{textAlign: "right"}}>
                        <Button bsStyle="link" onClick={onNewContent}>
                            <span className="text-success"><Icon.Plus /> Add new content</span>
                        </Button>
                    </ListGroupItem>
                </HasPermission>
                <HasPermission permissions={["cms.content.view"]}>
                    {content.sort(sortBy("postDate")).reverse().map(item =>
                        <ListGroupItem key={item.id} bsStyle={isSelected(item.id) ? "info" : "regular"} onClick={toggle(item.id)} >
                            {item.title}
                            <div style={{float: "right"}}><em>
                                {dateFormat(item.postDate, "mmmm dS, yyyy", true)}
                                </em></div>
                        </ListGroupItem>
                    )}
                </HasPermission>
              </ListGroup>
            : <span><Icon.Spinner spin /> Loading...</span>
        }
    </Col>
    <Col xs={12} sm={8} md={9} lg={10}>
        <Details contentId={selectedContentId} />
    </Col>
</Row>;