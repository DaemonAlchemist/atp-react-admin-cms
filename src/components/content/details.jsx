
import React from "react";
import {Row, Col, Panel} from "react-bootstrap";
import dateFormat from 'dateformat';
import marked from "marked";

import {InlineEdit} from 'atp-inline-edit';
import {Icon} from 'react-font-awesome-5';
import {Tags} from 'atp-tags';
import {HasPermission} from "atp-uac";

const CanEdit = props => <HasPermission yes permissions={["cms.content.update"]} {...props} />;
const CantEdit = props => <HasPermission no permissions={["cms.content.update"]} {...props} />;

export default ({content, updateContent}) => content ?
    <Row>
        <Col xs={12} md={9}>
            <h1 style={{marginTop: 0}}>
                <CanEdit>
                    <InlineEdit.Text
                        id={"content.title.edit" + content.id}
                        inline
                        value={content.title}
                        name="title"
                        onSave={updateContent}
                    />
                </CanEdit>
                <CantEdit>
                    {content.title}
                </CantEdit>
            </h1>
            <h3 style={{marginTop: 0}}>
                <CanEdit>
                    <InlineEdit.Text
                        id={"content.identifier.edit" + content.id}
                        inline
                        value={content.identifier}
                        name="identifier"
                        placeHolder="No identifier"
                        onSave={updateContent}
                    />
                </CanEdit>
                <CantEdit>
                    {content.identifier}
                </CantEdit>
            </h3>
        </Col>
        <Col xs={12} md={3}>
            <h3 style={{marginTop: 0}} className="text-right">
                <CanEdit>
                    <InlineEdit.Datepicker
                        id={"content.date.edit" + content.id}
                        value={content.postDate}
                        label="Release Date"
                        name="postDate"
                        onSave={updateContent}
                    />
                </CanEdit>
                <CantEdit>
                    {dateFormat(content.postDate, "fullDate", true)}
                </CantEdit>
            </h3>
        </Col>
        <Col xs={12}>
            <Panel>
                <Panel.Heading><Icon.FileAlt /> Content</Panel.Heading>
                <Panel.Body>
                    <CanEdit>
                        <InlineEdit.Wysiwyg
                            id={"content.content.edit" + content.id}
                            value={content.content}
                            name="content"
                            rows={10}
                            onSave={updateContent}
                        />
                    </CanEdit>
                    <CantEdit>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: marked(content.content || "")
                            }}
                        />
                    </CantEdit>
                </Panel.Body>
            </Panel>
            <Tags entityType="cmsContent" entityId={content.id} />
        </Col>
    </Row> : <div>Select a post...</div>;
