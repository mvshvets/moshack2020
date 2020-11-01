"""create table

Revision ID: 4ce65122823a
Revises: 
Create Date: 2020-10-29 21:56:16.223221

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ce65122823a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('overall_rating', sa.Integer(), nullable=True),
    sa.Column('operation_period', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_roads_created_date'), 'roads', ['created_date'], unique=False)
    op.create_index(op.f('ix_roads_name'), 'roads', ['name'], unique=False)
    op.create_index(op.f('ix_roads_overall_rating'), 'roads', ['overall_rating'], unique=False)
    op.create_table('titles_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('objects_count', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_titles_data_created_date'), 'titles_data', ['created_date'], unique=False)
    op.create_index(op.f('ix_titles_data_name'), 'titles_data', ['name'], unique=False)
    op.create_table('reports',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('created_date', sa.DateTime(), nullable=True),
    sa.Column('road_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['road_id'], ['roads.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reports_created_date'), 'reports', ['created_date'], unique=False)
    op.create_index(op.f('ix_reports_name'), 'reports', ['name'], unique=True)
    op.create_index(op.f('ix_reports_rating'), 'reports', ['rating'], unique=False)
    op.create_table('title_data_has_road',
    sa.Column('title_data_id', sa.Integer(), nullable=True),
    sa.Column('road_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['road_id'], ['roads.id'], ),
    sa.ForeignKeyConstraint(['title_data_id'], ['titles_data.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('title_data_has_road')
    op.drop_index(op.f('ix_reports_rating'), table_name='reports')
    op.drop_index(op.f('ix_reports_name'), table_name='reports')
    op.drop_index(op.f('ix_reports_created_date'), table_name='reports')
    op.drop_table('reports')
    op.drop_index(op.f('ix_titles_data_name'), table_name='titles_data')
    op.drop_index(op.f('ix_titles_data_created_date'), table_name='titles_data')
    op.drop_table('titles_data')
    op.drop_index(op.f('ix_roads_overall_rating'), table_name='roads')
    op.drop_index(op.f('ix_roads_name'), table_name='roads')
    op.drop_index(op.f('ix_roads_created_date'), table_name='roads')
    op.drop_table('roads')
    # ### end Alembic commands ###
